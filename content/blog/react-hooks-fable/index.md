---
path: '2018/11/10/react-hooks-in-fable/'
date: '2018-11-10'
title: 'React hooks preview with Fable'
tags: ['javascript','fable','fp', 'fsharp', 'react']
cover: './nojaf-fable-react-hooks.jpg'
---

## Introduction

A couple of weeks ago Facebook presented [React hooks](https://reactjs.org/docs/hooks-overview.html), a new way of accessing React features inside functional components.

In this blogpost I would like to show that the new hooks can easily be used in combination with [Fable](https://fable.io).

**Disclaimer:** Hooks are an experimental proposal to React, currently available in `16.7 alpha`, and the api is not final yet. Use at your own risk.

## useState()

A first example of a hook is [useState()](https://reactjs.org/docs/hooks-state.html).

```fsharp
type SetState<'t> = 't -> unit  
let useState<'t> (t: 't) : ('t * SetState<'t>) = import "useState" "react"
```

When the `useState` hook is called, we receive a variable representing the state and a function to update the state.

Example:

```fsharp
let (name, setName) = useState("nojaf")
```

Note that `useState` accepts a default value for the state.

To demonstrate this hook, we will create a todo list application.

### custom useInputValue hook

`useState` can also be used as a building block to create our own hook:

```fsharp
let useInputValue (initialValue : string) =  
    let (value, setValue) = useState (initialValue)
    let onChange (e : Fable.Import.React.FormEvent) =
        let value : string = e.target?value
        setValue (value)

    let resetValue() = setValue (System.String.Empty)

    value, onChange, resetValue
```

`useInputValue` provides an easy way to capture text from an input field.

```fsharp
type FormProps = { OnSubmit : string -> unit }

let formComponent (props : FormProps) =  
    let (value, onChange, resetValue) = useInputValue ""

    let onSubmit (ev : FormEvent) =
        ev.preventDefault()
        props.OnSubmit(value)
        resetValue()

    form [ OnSubmit onSubmit;  ] [
        input [ Value value; OnChange onChange; Placeholder "Enter todo"; ClassName "input" ]
    ]
```

`formComponent` is an ideal _dumb component_ to which we can add our todo from our _smart component_.

### Top level component

```fsharp
let appComponent() =  
    let (todos, setTodos) = useState<Todo list> ([])

    let toggleComplete i =
        todos
        |> List.mapi (fun k todo ->
            if k = i then { todo with Complete = not todo.Complete } else todo
        )
        |> setTodos

    let renderTodos =
        todos
        |> List.mapi (fun idx todo ->
            let style =
                CSSProp.TextDecoration(if todo.Complete then "line-through" else "")
                |> List.singleton

            let key = sprintf "todo_%i" idx

            div [ Key key; OnClick(fun _ -> toggleComplete idx) ] [
                label [ClassName "checkbox"; Style style] [
                    input [Type "checkbox"; Checked todo.Complete; OnChange(fun _ ->  toggleComplete idx)]
                    str todo.Text
                ]
            ]
        )

    let onSubmit text =
            { Text = text; Complete = false }
            |> List.singleton
            |> (@) todos
            |> setTodos

    div [] [
        h1 [ Class "title is-4" ] [ str "Todos" ]
        ofFunction formComponent { OnSubmit = onSubmit } []
        div [ClassName "notification"] renderTodos
    ]
```

Notice how we can use hooks at multiple levels and **how well this works together with F#**.

## useReducer()

The next hook we will explorer is [useReducer()](https://reactjs.org/docs/hooks-reference.html#usereducer).

```fsharp
type ReduceFn<'state,'msg> = ('state -> 'msg -> 'state)  
type Dispatch<'msg> ='msg -> unit  
let useReducer<'state,'msg> (reducer: ReduceFn<'state,'msg>) (initialState:'state) : ('state * Dispatch<'msg>)  = import "useReducer" "react"
```

This has an extremely Elm/Redux/Elmish vibe to it, so let's build the mandatory counter example. The code is so self-explanatory that you should instantly see where this is going.

```fsharp
type Msg =  
    | Increase
    | Decrease
    | Reset

type Model = { Value: int }

let intialState = { Value = 0}

let update model msg =  
    match msg with
    | Increase -> { model with Value = model.Value + 1}
    | Decrease -> { model with Value = model.Value - 1}
    | Reset -> intialState

let reducerComponent () =  
    let (model, dispatch) = useReducer update intialState

    div [] [
        button [ClassName "button"; OnClick (fun _ -> dispatch Increase)] [str "Increase"]
        button [ClassName "button"; OnClick (fun _ -> dispatch Decrease)] [str "Decrease"]
        button [ClassName "button"; OnClick (fun _ -> dispatch Reset)] [str "Reset"]
        p [ClassName "title is-2 has-text-centered"] [sprintf "%i" model.Value |> str]
    ]
```

And there you have it. I believe this will be a nice alternative to Elmish if you are building something small.

## useEffect()

Lastly, a demo on [useEffect()](https://reactjs.org/docs/hooks-reference.html#useeffect), think of it as a way to launch side effects when a component renders.

```fsharp
let useEffect (effect: (unit -> U2<unit, (unit -> unit)>)) (dependsOn: obj array) : unit = import "useEffect" "react"
```

We would like to download a list of github repositories of a selected user/organization.

For the download itself we use `fetch` from [Fable.PowerPack](http://fable.io/fable-powerpack/).

```fsharp
let githubUsers =  
        [ "fable-compiler"; "fsprojects"; "nojaf" ]

let decodeRepoItem =  
    Decode.field "name" Decode.string

let decodeResonse = Decode.array decodeRepoItem

let loadRepos updateRepos user =  
    let url = sprintf "https://api.github.com/users/%s/repos" user
    Fetch.fetch url []
    |> Promise.bind (fun res -> res.text())
    |> Promise.map (fun json -> Decode.fromString decodeResonse json)
    |> Promise.mapResult updateRepos
    |> ignore
```

This code will execute the `updateRepos` function when the download was successful and the decoding of the json worked out.

```fsharp
let effectComponent() =  
    let options =
        githubUsers
        |> List.map (fun name ->
            option [ Value name; Key name ] [ str name ]
        )
        |> (@) (List.singleton (option [Value ""; Key "empty"] []))

    let (selectedOrg, setOrganisation) = useState ("")
    let (repos, setRepos) = useState(Array.empty)
    let onChange (ev : FormEvent) = setOrganisation (ev.Value)

    useEffect (fun () ->
        match System.String.IsNullOrWhiteSpace(selectedOrg) with
        | true -> setRepos Array.empty
        | false -> loadRepos setRepos selectedOrg
        |> U2.Case1
    ) [| selectedOrg |]

    let repoListItems =
        repos
        |> Array.sortWith (fun a b -> String.Compare(a,b, System.StringComparison.OrdinalIgnoreCase))
        |> Array.map (fun r -> li [Key r] [str r])

    div [ClassName "content"] [
        div [ClassName "select"] [
            select [ Value selectedOrg; OnChange onChange ] options
        ]
        ul [] repoListItems
    ]
```

Let us take a closer look to the `useEffect` code:

```fsharp
useEffect (fun () ->
    match System.String.IsNullOrWhiteSpace(selectedOrg) with
    | true -> ()
    | false -> loadRepos setRepos selectedOrg
    |> U2.Case1
) [| selectedOrg |]
```

The first argument of `useEffect` takes a function that returns `unit` or a `new function that returns unit`. The latter can be used to clean up the effect, if for example we were to wire some event handlers.

That array we pass as second argument with the value of `selectedOrg`, serves to tell the hook that we only need to re-evaluate when that value changes.

## The Source

All samples can be found on [github](https://github.com/nojaf/fable-react-hooks-sample), or you can try them [online](https://nojaf.github.io/fable-react-hooks-sample/#).

## Remarks

*   I liked how easy it was to create bindings for hooks. Fable clearly is a match for this.
*   Hooks work really well for small application. I believe they might also shine in larger applications. To be investigated.
*   You need React `16.7.0-alpha.0` to play with hooks.
*   If you are using webpack, hot module reloading and hooks don't mix at the time of writing.

## Final words

I hope you enjoyed this blogpost and it all makes sense to you. If you have any suggestions or questions, please leave a comment.

Yours truly,  
nojaf

Photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@ravenwolfab?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Alan Bishop"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Alan Bishop</span></a>