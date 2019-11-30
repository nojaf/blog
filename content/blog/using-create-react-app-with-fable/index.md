---
path: '2019/12/10/using-create-react-app-with-fable/'
date: '2019-12-10'
title: 'Using Create React App with Fable'
tags: ['javascript','fable','fsharp', 'react']
cover: './create-react-app-with-fable.jpg'
---

## Introduction

2019 has been a great year for me for all things F# related! I helped out with the organization of [FableConf in Antwerp](https://axxes.com/en/net-2-en/axxes-proud-host-of-fableconf-2019/), gave a [webinar at JetBrains](https://blog.jetbrains.com/dotnet/2019/07/24/webinar-from-fsharp-to-javascript-with-fable/) and was able to release [Fantomas 3.0](https://axxes.com/en/net/fantomas-3-0-over-and-above/).
To wrap up the decade I'm writing this post as part of the **[F# Advent Calendar in English 2019](https://sergeytihon.com/2019/11/05/f-advent-calendar-in-english-2019/)**.<br/>
I had fun [last year](/2018/12/17/writing-a-vscode-extension-with-fable-2-1/) and I wish to continue this trend.

### To Feliz or not to Feliz

[Feliz](https://zaid-ajaj.github.io/Feliz/) has been receiving some traction in the community and at one point Zaid asked me what I thought about it.
My reply was a resounding `meh` 😅, I didn't really care then and I still don't.<br />
If it works for you, that is fine and all I want to say is that it's not for everyone.<br />
So to further mess around with Zaid, I'm gonna explore yet another alternative of creating views in Elmish, by using React as is.

### TL;DR

In blog post we are going to combine [Fable](https://fable.io/) with [Create React App](https://create-react-app.dev/).
Writing our views with vanilla React components and our logic in F#.

## Capital Guardian

Recently I have the need to track where my money is going too. Or as we say in Belgium, there is a hole in my wallet somehow.
Obviously using an existing online tool is too easy so I decided to build something myself.

The domain is actually a bit more complex than you would think at first glance. See the basics are simple, I get money from my employer and I spend money.
Capture all those transactions and you know the balance. However some expenses are recurring or sometimes you want to spread an bigger expense over multiple months.
Anyway, we aren't going to cover the entire application but you can sorta see where this could go to.<br />
It is technically challenging enough to serve as a good exercise in domain modeling and **event sourcing**.

### Architecture

Since we are doing event sourcing I'm eager to use Azure Functions and [Cosmo store](https://github.com/Dzoukr/CosmoStore) for the back-end.
However this post is about the front-end and we will focus solely on that.

## Create React App and Fable

As mentioned the first thing we want to do is scaffold a new project with Create React App.
I'm a Yarn guy so:

> yarn create react-app capital-guardian

CRA has amazing documentation and the key takeaway here is that I don't gave to do any crazy webpack shizzle.
It just works &copy; and I don't have to maintain anything. 

### Compiling F#

There are a few moving pieces in setting up the front-end development experience.
The F# files should be compiled to ES6 JavaScript before the React development server starts.
We can solve this problem using a FAKE script.

### Paket

First let's install some .NET Core 3 tools.

> dotnet new tool-manifest
>
> dotnet tool install paket
>
> dotnet tool install fake-cli

Setup our .NET dependencies:

> dotnet paket init

Change `paket.dependencies` to

```
group client
storage:none
source: https://api.nuget.org/v3/index.json
framework: netstandard2.0

nuget Fable.React
nuget Fable.Elmish
nuget Fable.Promise
nuget Fable.Fetch
nuget Thoth.Json

group build
storage:none
source: https://api.nuget.org/v3/index.json
framework: netstandard2.0
nuget Fake.Core.Target
nuget Fake.IO.FileSystem
nuget Fake.JavaScript.Yarn
nuget Fake.DotNet.Paket
nuget Fantomas
```

And install everything:

> dotnet paket install

### FAKE

Next, create a `build.fsx` script:

```
#r "paket: groupref build //"
#load ".fake/build.fsx/intellisense.fsx"

open Fake.Core
open Fake.Core.TargetOperators
open Fake.DotNet
open Fake.IO
open Fake.IO.FileSystemOperators
open Fake.IO.Globbing.Operators
open Fake.JavaScript
open System
open Fantomas.FakeHelpers
open Fantomas.FormatConfig

let clientPath = Path.getFullName "./"
let setYarnWorkingDirectory (args: Yarn.YarnParams) = { args with WorkingDirectory = clientPath }

module Paket =
    let private runCmd cmd args =
        CreateProcess.fromRawCommand cmd args
        |> Proc.run
        |> ignore

    let private paket args = runCmd "dotnet" ("paket" :: args)

    let ``generate load script``() = paket [ "generate-load-scripts"; "-f"; "netstandard2.0"; "-t"; "fsx" ]

Target.create "Clean" (fun _ ->
    Shell.rm_rf (clientPath </> ".fable")
    Shell.rm_rf (clientPath </> "src" </> "bin"))

Target.create "Yarn" (fun _ -> Yarn.installPureLock setYarnWorkingDirectory)

Target.create "Paket" (fun _ ->
    Paket.restore id
    Shell.rm_rf (".paket" </> "load")
    Paket.``generate load script``())

Target.create "Build" (fun _ -> Yarn.exec "build" setYarnWorkingDirectory)

"Clean" ==> "Paket" ==> "Yarn" ==> "Build"

Target.runOrDefault "Build"
```

As a first draft of our build script we can install our dependencies and build our application.
Notice the little helper module to [generate the load script](https://fsprojects.github.io/Paket/paket-generate-load-scripts.html).
However nothing Fable related is in place yet.

### Fable

Install `fable-splitter` &amp; `fable-compiler` and add a script to our package.json to start the splitter.
Then create `Main.fsx` in a `fsharp` folder.

```
#load "../.paket/load/netstandard2.0/client/client.group.fsx"

printfn "Fable compiled this"
```

Running `yarn fable` now compiles the F# to `src/bin`.

> yarn add fable-splitter fable-compiler

Add `import './bin/Main';` to `App.js` and start the development server using `yarn start`.

### Adjust Create React App

And just like that:

![Create React App failed to compile](./cra-failed-to-compile.png)

Well CRA does JavaScript linting as well and it is rejecting the compiled F# code.
Or at least a part of the `Fable.Core` library in this case.
We want to tell the linter that it should ignore the `src/bin` folder.

Create a `.eslintignore` file and add `src/bin/**` to it.
For the ignore file to be picked up add an `.env` file with `EXTEND_ESLINT=true`.

![Fable compiled this](./fable-compiled-this.png)

Great! At this point running `dotnet fake run build.fsx` will compile the F# and create a production build of Create React App.

###  Watch mode

`fable-splitter` has a watch mode, however using this can lead some chicken and egg problems.
If the F# has never been compiled and CRA is started it will fail. A possible solution could be to compile the F#, start CRA and then compile F# in watch mode.
Unfortunately this is an expensive operation. A workaround can be created in our build script.

```
Target.create "Watch" (fun _ ->
    let fableOutput output =
        Trace.tracefn "%s" output
        if output = "fable: Watching..." then
            Yarn.exec "start" setYarnWorkingDirectory

    let fableError output = Trace.traceErrorfn "\n%s\n" output

    let compileFable =
        CreateProcess.fromRawCommand Yarn.defaultYarnParams.YarnFilePath ["fable";"--watch"]
        |> CreateProcess.withWorkingDirectory clientPath
        |> CreateProcess.redirectOutput
        |> CreateProcess.withOutputEventsNotNull fableOutput fableError
        |> Proc.startAndAwait
        |> Async.Ignore

    Async.RunSynchronously compileFable)

"Clean" ==> "Paket" ==> "Yarn" ==> "Build"

"Paket" ==> "Yarn" ==> "Watch"

Target.runOrDefault "Build"
```

Admittedly this is a bit of hack, first we start the splitter process and read all the output.
If the output says `fable: Watching...`, it means the initial JavaScript was emitted (to `src/bin`).
Once we have that, we can start CRA.

Any changes to either `*.js` or  `*.fsx` files will trigger a browser reload and this provides us a rich developer experience.

## Enter Elmish

### React Context

### Hooks

## Formatting

## The source

https://github.com/nojaf/capital-guardian

## Final words



Yours truly,  
nojaf

Photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@aditya1702?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Aditya Vyas"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Aditya Vyas</span></a>