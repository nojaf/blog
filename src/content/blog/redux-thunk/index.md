---
path: "2015/12/06/redux-thunk/"
date: "2015-12-06"
title: "Redux Thunk, javascript middleware for Redux"
tags: ["javascript"]
cover: "./nojaf-com-redux-thunk-banner.jpg"
---

## Introduction

Lately I've been using a lot of Reactjs goodness in my side projects. React is only the V in a modern day MVW (Model, View Whatever) pattern and that's an interesting subject. Facebook uses its own [Flux](https://facebook.github.io/flux/) library/pattern/architecture to cope with the other stuff, however there seem to be a lot of different opinions when it's comes to flux.

One of those flux variants is Redux, created by Dan Abramov and others. If you never heard of Redux or don't really know how it works, I suggest you [watch these videos first](https://egghead.io/series/getting-started-with-redux). In this blogpost I'll explain a way of dealing with async operations using [Redux Thunk](https://github.com/gaearon/redux-thunk).

## Explaining the problem

The main reason why we can't use async is due to the way a reducer function works. The concept of a reducer is that it takes the current state and an action and it returns the next state. It's a pure function that does not modify the current state.

```js
function myReducer(previousState, someAction) {
  var nextState = {
    foo: previousState.foo,
    bar: someAction.bar,
  };
}
```

If would we want to do some async stuff we would have to wait until a Promise is resolved and then return the next state. We could just return the previous state and dispatch a new action once our Promise is resolved.

```js
function myReducer(previousState, someAction) {
  someAsyncMethod(someAction.bar).then(function (result) {
    myStore.dispatch({ type: "SOME_TYPE", bar: result });
  });
  return previousState;
}
```

This is a bad approach because we can have side effects here.  
The function is no longer pure. _What if the Promise is rejected?_  
It's also not allowed by the Redux store if you look at the [source code](https://github.com/rackt/redux/blob/master/src/createStore.js#L116).

## Enter middleware

Middleware is magical concept created by ancient elves riding unicorns. No not really, although I have to admit that it does seem a bit overwhelming at first. The essence of middleware is that it runs in the Store before the action is dispatched to the reducer. You can read [the docs](http://redux.js.org/docs/advanced/Middleware.html) for the long version.

> It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
>
> _Redux docs_

The Thunk middleware looks like this

```js
export default function thunkMiddleware({ dispatch, getState }) {
  return (next) => (action) =>
    typeof action === "function" ? action(dispatch, getState) : next(action);
}
```

Although this is a bit hard to read, let me put that in ES5 for a moment

```js
function thunkMiddleware(store) {
  return function (next) {
    return function (action) {
      if (typeof action === "function") {
        return action(store.dispatch, store.getState);
      } else {
        return next(action);
      }
    };
  };
}
```

So next is actually the next piece of middleware. The last piece of middleware should call _next_ otherwise the action never gets dispatched to the root reducer. [Example](https://jsfiddle.net/6Lwte98g/)

So basically the Thunk middleware stops the chain when the action is a function.  
In the source of Thunk, the outcome of the action function gets returned but the value is most likely to be a Promise so I don't think that it is necessary to return the value of `action(store.dispatch, store.getState)`.

## A full example

Enough with the theory, let's create an actual example.  
We'll create a little app that fetches github repositories from a user.

### The application state

When creating a Redux application I always find it helpful to have an idea of the application state. We need to store the username, the repositories and a flag whether we are loading the repos or not.

```js
{
    "user":"nojaf",
    "repos":[...],
    "isLoading":false
}
```

### Actions and Action creators

```js
function addReposAction(jsonResult) {
  return {
    type: "ADD_TWEETS",
    repos: jsonResult,
  };
}

function userChangedAction(value) {
  return {
    type: "USER_CHANGED",
    value: value,
  };
}

function loadingChangedAction(isLoading) {
  return {
    type: "IS_LOADING",
    isLoading: isLoading,
  };
}
```

The first three action creators are easy to understand, they return an action, the end. As we saw in the code of Thunk the action can also be a function.  
So our action creator that eventually does some async code should return a function.

**Wait, wait, wait. An action creator that returns a function??!?** How is that even an action creator? Well it isn't really but it isn't a reducer either, it's a function that returns a function. So instead of debating on semantics let's look at the code.

```js
// returns a function and will be called in the Redux-Thunk middleware
function loadReposAction() {
  return function (dispatch, getState) {
    var state = getState();
    var url = "https://api.github.com/users/" + state.user + "/repos";
    dispatch(loadingChangedAction(true));

    return fetch(url)
      .then(function (result) {
        dispatch(loadingChangedAction(false));

        if (result.status === 200) {
          return result.json();
        }

        throw "request failed";
      })
      .then(function (jsonResult) {
        dispatch(addReposAction(jsonResult));
      })
      .catch(function (err) {
        sweetAlert(
          "Oops...",
          "Couldn't fetch repos for user: " + state.user,
          "error",
        );
      });
  };
}
```

So the clue with the `loadReposAction` function is that we can do async stuff and then dispatch when we have something. Each dispatch call will run synchronously and update the application state. Whether we return the Promise of the fetch function doesn't really matter.

### The reducer

Nothing special here:

```js
function initialState() {
  return {
    user: "",
    repos: [],
    isLoading: false,
  };
}

function rootReducer(state, action) {
  var previousState = state ? state : initialState();

  switch (action.type) {
    case "ADD_TWEETS":
      return addTweets(previousState, action);
      break;
    case "USER_CHANGED":
      return userChanged(previousState, action);
      break;
    case "IS_LOADING":
      return isLoadingChanged(previousState, action);
    default:
      return previousState;
  }
}
```

### Wiring up the Store

```js
var createStoreWithMiddleware = Redux.applyMiddleware(thunkMiddleware)(
  Redux.createStore,
);
var store = createStoreWithMiddleware(rootReducer);
```

### Dispatching

So in order to bootstrap the application we'll have to dispatch some actions to get things going.

```js
store.dispatch(userChangedAction("nojaf"));
// this will update the state to have a username
store.dispatch(loadReposAction());
// Thunk will execute the return value of loadReposAction
```

## To Thunk or not to Thunk?

So using the Thunk middleware we can execute async stuff. We briefly saw how middleware works and we most likely scratched our heads. Couldn't we just call the `loadReposAction` directly and pass down the store?

Something like:

```js
function loadReposAction2(store) {
  var state = store.getState();
  var url = "https://api.github.com/users/" + state.user + "/repos";
  store.dispatch(loadingChangedAction(true));

  fetch(url)
    .then(function (result) {
      store.dispatch(loadingChangedAction(false));

      if (result.status === 200) {
        return result.json();
      }

      throw "request failed";
    })
    .then(function (jsonResult) {
      store.dispatch(addReposAction(jsonResult));
    })
    .catch(function (err) {
      sweetAlert(
        "Oops...",
        "Couldn't fetch repos for user: " + state.user,
        "error",
      );
    });
}
```

And just call `loadReposAction2(myStore);`???

Well turns out we can and none of this was really necessary. It seems like a good idea to keep the flow consistent and use the dispatcher for all actions. In the end it's personal choice I think.

## The Source

I've created a [jsfiddle](//jsfiddle.net/8y8e427g/13/) with the result.

## Remarks

- Writing this blogpost really taught me how to use Redux Thunk, once you get it, it's actually quite easy.
- Middleware on the other hand can still be a bit confusing from time to time.
- Please correct me if you find any mistakes.

## Final words

I hope you enjoyed this blogpost and it all makes sense. If you have any suggestions or questions please leave a comment.

Yours truly,  
nojaf
