---
path: "2016/11/28/adventures-in-elm/"
date: "2016-11-28"
title: "Adventures in Elm"
tags: ["javascript", "elm", "fp"]
cover: "./blog.nojaf.com.adeventures-in-elm.jpg"
---

## Introduction

2016 for me personal was the year the I came in serious contact with **functional languages**. I started looking at F#, applied functional concepts (partial application, immutability, pure functions and so on) in JavaScript, gave RxJS a shot and fell in love with React.

A logical next step was looking at **Elm**. I was first introduced to Elm at a [Socrates Meetup](https://www.meetup.com/socratesbe/events/228173829/) a while ago by [Thomas Coopman](https://thomascoopman.eu/). To be honest I was a bit overwhelmed at the time and a bit skeptical afterwards.

I decided to give Elm another shot and learned a lot by following [Elm for beginners](http://courses.knowthen.com/p/elm-for-beginners). Now I feel ready to create small Elm applications.

## The Christmas presents application

We have this family tradition that on Christmas Eve we give presents to each other among cousins. Each cousin or niece draws a name and gives a present to that person.  
For a very long time the name drawing was done in a low tech fashion. But in more recent years I create a little application to automate the process.

The first iteration was me playing around with [Owin/Katana](https://github.com/nojaf/OwinChristmasPresents) and the second with [React/Redux](https://github.com/nojaf/christmas-redux).  
This year I decide to go with Elm.

I assume you know a thing or two about Elm as I'm not really explaining every single detail.  
This blogpost is merely a walkthrough of a little Elm application I wrote.

### Getting started

I used [elm-webpack-starter](https://github.com/moarwick/elm-webpack-starter) to get started because I would also play around with [Bulma](http://bulma.io/).

I populated the Main.elm file with

And filled in all the pieces.

### The model

The model part is very easy. There is a list of Person, a result dictionary and String property to contain the name of a new Person.

```elm
type alias Person =
    { name : String, id : Int }

type alias Model =
    { people : List Person, result : Dict Int Int, newPerson : String }

init : ( Model, Cmd Msg )
init =
    ( (Model [] Dict.empty ""), Cmd.none )
```

### Actions

Very few messages but there is a bit of a twist in determining the result dictionary.

```elm
type Msg
    = UpdateNewPerson String
    | AddPerson
    | RemovePerson Int
    | Generate
    | Result (List Int)
```

### View

Very standard Elm stuff here as well.  
I'm listing the code below to get the complete picture but notice that not much in going on.

```elm
view : Model -> Html Msg
view model =
    div []
        [ createForm model.newPerson
        , createPeopleTable model.people
        , createGenerateButton model.people
        , createResultTable model
        ]

createForm : String -> Html Msg
createForm currentName =
    Html.form [ class "entry box", onSubmit AddPerson ]
        [ h4 [ class "subtitle" ] [ text "Personen toevoegen" ]
        , p [ class "control has-addons" ]
            [ input [ class "input", type_ "text", placeholder "Vul een nieuwe naam in", onInput UpdateNewPerson, value currentName ] []
            , a [ class (formButtonClass currentName), onClick AddPerson ] [ text "Toevoegen" ]
            ]
        ]

formButtonClass : String -> String
formButtonClass currentName =
    if String.isEmpty currentName then
        "button is-info is-disabled"
    else
        "button is-info"

createPeopleTable : List Person -> Html Msg
createPeopleTable people =
    table [ class "table is-striped" ]
        [ thead []
            [ tr []
                [ th [] [ text "Naam" ]
                , th [ colspan 3 ] [ text "Verwijderen" ]
                ]
            ]
        , tbody [] (List.map createPeopleTableRow people)
        ]

createPeopleTableRow : Person -> Html Msg
createPeopleTableRow person =
    tr []
        [ td [] [ text person.name ]
        , td [ class "is-icon" ]
            [ div [ class "button is-danger is-small", onClick (RemovePerson person.id) ]
                [ i
                    [ class "fa fa-times" ]
                    []
                ]
            ]
        ]

createGenerateButton : List Person -> Html Msg
createGenerateButton people =
    let
        disabledClass =
            if List.length people <= 1 then
                "is-disabled"
            else
                ""
    in
        button [ class ("button is-primary is-large " ++ disabledClass), onClick Generate, id "generate" ] [ text "Genereer" ]

createResultTable : Model -> Html Msg
createResultTable model =
    let
        resultList =
            Dict.toList model.result

        createRow =
            createResultRow model
    in
        table [ class "table is-striped" ]
            [ thead []
                [ tr []
                    [ th [] [ text "Resultaat" ]
                    , th [] []
                    , th [] []
                    ]
                ]
            , tbody [] (resultList |> List.map createRow)
            ]

createResultRow : Model -> ( Int, Int ) -> Html Msg
createResultRow model ( id, for ) =
    let
        subject =
            getNameById model id

        target =
            getNameById model for
    in
        tr []
            [ td [] [ text subject ]
            , td [] [ text "koopt voor" ]
            , td [] [ text target ]
            ]

getNameById : Model -> Int -> String
getNameById model id =
    List.filter (\p -> p.id == id) model.people
        |> List.head
        |> Maybe.map (\p -> p.name)
        |> Maybe.withDefault "???"
```

I created some functions to split everything up, used some Bulma classes and Bob's your uncle

## Update

This is the part where it got a bit tricky.

```elm
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateNewPerson newValue ->
            ( { model | newPerson = newValue }, Cmd.none )

        AddPerson ->
            addPerson model

        RemovePerson id ->
            removePerson model id

        Generate ->
            ( model, generate model )

        Result ids ->
            processResult model ids

removePerson : Model -> Int -> ( Model, Cmd Msg )
removePerson model id =
    let
        nextModel =
            { model | people = (List.filter (\p -> p.id /= id) model.people) }
    in
        if (List.length nextModel.people) > 1 then
            ( nextModel, generate nextModel )
        else
            ( { nextModel | result = Dict.empty }, Cmd.none )

addPerson : Model -> ( Model, Cmd Msg )
addPerson model =
    let
        nextId =
            List.map (\p -> p.id) model.people
                |> List.maximum
                |> Maybe.withDefault 0
                |> (+) 1

        nextPerson =
            Person model.newPerson nextId
    in
        ( { model | people = nextPerson :: model.people, newPerson = "" }, Cmd.none )

processResult : Model -> List Int -> ( Model, Cmd Msg )
processResult model ids =
    let
        personIds =
            List.map (\p -> p.id) model.people

        merged =
            List.map2 (,) personIds ids
    in
        ( { model | result = Dict.fromList merged }, Cmd.none )
```

`UpdateNewPerson`, `AddPerson` and `RemovePerson` are straightforward but I scratched my head to generate the actual result. I couldn't figure out how to get a randomized list of the person ids to populate the result dictionary.

## Generating the result

### Problem

To determine the result of who buys for who I would basically take the list of ids and shuffle it until no indexes are the same. But such a function would not be a pure one as the outcome could be different each time you call it.

### Solution

When I doubt stick to what you know! So I decide to tackle the problem in JavaScript using Elm's port system.

```elm
port generationRequest : List Int -> Cmd msg

generate : Model -> Cmd Msg
generate model =
    generationRequest (List.map (\p -> p.id) model.people)
```

Note that `generate` is being called when a `Generate` message enters the update function by the onClick event. The `generationRequest` command return from the update function can be captured in the JavaScript world and will contain an array of ids when called.

```js
// pull in desired CSS/SASS files
require("./styles/main.scss");

// inject bundled Elm app into div#main
var Elm = require("../elm/Main");
var app = Elm.Main.embed(document.getElementById("main"));

app.ports.generationRequest.subscribe(function (ids) {
  app.ports.generationResponse.send(createResponse(ids));
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createResponse(persons) {
  var result = shuffle(persons.slice(0));

  var duplicates = result.some(function (id, index) {
    return id === persons[index];
  });

  return duplicates ? createResponse(persons) : result;
}
```

Inside the subscribe function I call the `generationResponse` port in Elm to return the result.  
In order to capture the result I need a subscription in Elm.

```elm
port generationResponse : (List Int -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
    generationResponse Result

main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
```

So the port gets called, the subscription message will find its way into the update function (into `processResult`) and the result can used to populate the dictionary.

```elm
processResult : Model -> List Int -> ( Model, Cmd Msg )
processResult model ids =
    let
        personIds =
            List.map (\p -> p.id) model.people

        merged =
            List.map2 (,) personIds ids
    in
        ( { model | result = Dict.fromList merged }, Cmd.none )
```

## The Source

Is on my [github](https://github.com/nojaf/christmas-elm) or you can view the result on [https://nojaf.github.io/christmas-elm/](https://nojaf.github.io/christmas-elm/).

## Remarks

- Comparing to my [React/Redux example](https://github.com/nojaf/christmas-redux) I enjoyed Elm a lot more. Mainly because there is so much goodness just out of the box where with JavaScript you need to set it up yourselves. I'm talking about the frameworks here _(Redux/ImmutableJS/React/DevTools)_, a lot of these solutions are included in the Elm language/architecture.
- I didn't write any tests and I actually feel ok with this. The Elm compiler is so brilliant that I trust the output once it gets compiled.
- Elm really deserves a lot more attention. Too many developers are hyped with Angular2/TypeScript, Vuejs, React/Flow and others. Nothing wrong with these great frameworks, I merely encourage everyone to try out Elm as it changed the way I look at the JavaScript landscape.

## Final words

I hope you enjoyed this blogpost and it all makes sense. If you have any suggestions or questions please leave a comment.

Yours truly,  
nojaf
