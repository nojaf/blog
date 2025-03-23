---
path: "2025/03/23/rescript-eslint-and-the-react-compiler/"
date: "2025-03-23"
title: "ReScript, ESLint and the React Compiler"
tags: ["rescript", "tooling"]
cover: "./blog.nojaf.com-rescript-eslint-and-the-react-compiler.jpeg"
backgroundPosition: "initial"
---

## Introduction

I'm currently working on a frontend project using [ReScript](https://rescript-lang.org/) and React 19.
While I consider myself a competent React developer, I appreciate having tools that help maintain best practices.
A linter proves invaluable in ensuring I follow [the rules of React](https://react.dev/reference/rules/rules-of-hooks), and since my instinct for React memoization isn't perfectly tuned yet, I'm leveraging the new React compiler to handle that optimization.

ReScript doesn't include built-in linting or analysis tools, so in this post, I'll explain how to set up [eslint](https://eslint.org/) to analyze the JavaScript output.

For this setup, I'm using [Bun](https://bun.sh/) as my JavaScript runtime and package manager.

## Installation

At the time of writing, I'm using ReScript 12 (alpha version).
To follow along, create a new Vite project using:

```shell
bun create rescript-app@next
```

Select Vite and the latest v12 alpha version when prompted.

Next, install the required dependencies:

```shell
bun i -D eslint eslint-plugin-react-compiler eslint-plugin-react-hooks
```

⚠️ Ensure you're using React 19:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

## ESLint Configuration

In our `rescript.json`, we've set the `suffix` to `".res.mjs"`. We'll need to configure ESLint to process these files in our `eslint.config.js`:

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

To run the linter:

```shell
bunx rescript
bunx eslint
```

Let's verify our setup with a test component in `src/Hello.res`:

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

Running `bunx eslint` will show:

```shell
/our-project/src/Hey.res.mjs
  12:5  error  Hooks must always be called in a consistent order, and may not be called conditionally. See the Rules of Hooks (https://react.dev/warnings/invalid-hook-call-warning)  react-compiler/react-compiler
  12:5  error  React Hook "React.useState" is called conditionally. React Hooks must be called in the exact same order in every component render                                      react-hooks/rules-of-hooks

✖ 2 problems (2 errors, 0 warnings)
```

## React Compiler Configuration

To integrate the React compiler, modify your `vite.config.js`:

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

This configuration ensures the compiler transforms our JavaScript code when the browser requests modules.
Note: The React compiler currently [doesn't recognize compiled JSX](https://github.com/reactwg/react-compiler/discussions/22).

To work around this limitation, we need to annotate our components with the `'use memo'` directive:

```ReScript
@react.component
let make =
@directive("'use memo'")
(~count) => {
    let (double, setDouble) = React.useState(_ => 2 * count)

    <div> {React.string(`Hello`)} </div>
}
```

This compiles to:

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

And transforms to:

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

## Conclusion

ESLint and the React Compiler are powerful tools for improving React code quality.
While native ReScript tooling for these features would be ideal, this setup effectively catches potential issues and provides valuable optimizations.
The combination of static analysis and automated performance improvements helps create more reliable React applications.
