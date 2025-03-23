---
path: "2025/03/23/rescript-eslint-and-the-react-compiler/"
date: "2025-03-23"
title: "ReScript, ESLint and the React Compiler"
tags: ["rescript", "tooling"]
cover: "./blog.nojaf.com-rescript-eslint-and-the-react-compiler.jpeg"
backgroundPosition: "initial"
---

## Introduction

I'm currently working on a frontend project where I'm using [ReScript](https://rescript-lang.org/) and React 19.
I consider myself an ok, React developer, but not an expert.
So I do benefit from a linter that keeps an eye out whehter I'm playing by [the rules of React](https://react.dev/reference/rules/rules-of-hooks). And my fingerspitzengefühl to use memoization in React is also not the greatest, so we will have the new React compiler do that for us.

ReScript doesn't come with something like linters or analyzers, so I this blogpost I'm going to describe my setup on how I run [eslint](https://eslint.org/) on my javascript output.

Oh yeah and I'm using [Bun](https://bun.sh/), merely because I like it and I can. I'm a Bun guy.

## Installation

I'm using ReScript 12, which is in alpha state at the time of writing.
If you want to follow along, you can scaffold a new Vite project using

```shell
bun create rescript-app@next
```

Choose the Vite and the latest v12 alpha.

Next, we will need a couple of node packages:

```shell
bun i -D eslint eslint-plugin-react-compiler eslint-plugin-react-hooks
```

⚠️ Also check that you are using React 19:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

## ESLint config

The `suffix` our `rescript.json` file is `".res.mjs",`, so we will need to tell it to process those files in our `eslint.config.js`:

```js
import reactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";

export default [
  {
    files: ["src/*.res.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-compiler/react-compiler": "error",
    },
  },
];
```

If we now run:

```
bunx rescript
bunx eslint
```

Our files will be linted.

We can test this by adding `src/Hello.res`:

```ReScript
let someCheck = () => Math.random() == 1.

@react.component
let make = () => {
  if someCheck() {
    let (v, s) = React.useState(_ => 1)
  }

  <h1> {React.string("hey")} </h1>
}
```

After `bunx eslint` we see:

```shell
/our-project/src/Hey.res.mjs
  12:5  error  Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://react.dev/warnings/invalid-hook-call-warning)  react-compiler/react-compiler
  12:5  error  React Hook "React.useState" is called conditionally. React Hooks must be called in the exact same order in every component render                                      react-hooks/rules-of-hooks

✖ 2 problems (2 errors, 0 warnings)
```

## React compiler config

To wire up the React compiler, we need to modify our `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ReactCompilerConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.res\.mjs$/,
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
});
```

This will ensure the compiler transforms our javascript code when the browser is requesting modules.
However, there is one catch here! The React compiler currently [doesn't recognise compiled JSX](https://github.com/reactwg/react-compiler/discussions/22).

So we would need to annotate our components with the `'use memo'` directive.

For example:

```ReScript
@react.component
let make =
@directive("'use memo'")
(~count) => {
    let (double, setDouble) = React.useState(_ => 2 * count)

    <div> {React.string(`Hello`)} </div>
}
```

is compiled to

```js
import * as React from "react";
import * as JsxRuntime from "react/jsx-runtime";

function Playground(props) {
  "use memo";
  let count = props.count;
  React.useState(() => count << 1);
  return JsxRuntime.jsx("div", {
    children: "Hello",
  });
}
```

And will be transformed to

```js
import { c as _c } from "react/compiler-runtime";
import * as React from "react";
import * as JsxRuntime from "react/jsx-runtime";

function Playground(props) {
  "use memo";
  const $ = _c(3);

  const count = props.count;
  let t0;
  if ($[0] !== count) {
    t0 = () => count << 1;
    $[0] = count;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  React.useState(t0);
  let t1;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = JsxRuntime.jsx("div", { children: "Hello" });
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  return t1;
}
```

## Closing thoughts

I think both ESLint and the React Compiler are super useful to create better React code.
In a perfect world these things happen on the ReScript side, but overall I'm pretty okay with this setup. It catches problems and helps me out.
