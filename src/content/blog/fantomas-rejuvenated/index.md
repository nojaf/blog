---
path: "2018/05/03/fantomas-rejuvenated/"
date: "2018-05-03"
title: "Fantomas rejuvenated: .NET cli tool"
tags: ["fable", "docker", "fsharp"]
cover: "./nojaf.com.fantomas.rejuvenated.jpg"
photoCredit:
  author: "Annie Spratt"
  username: "anniespratt"
---

## Introduction

As part of the [F# mentorship program](https://fsharp.org/mentorship/index.html) my mentor [Anthony Lloyd](http://anthonylloyd.github.io) and I have been working on the [Fantomas project](https://github.com/dungpa/fantomas).  
Fantomas is like [prettier](https://prettier.io) or [elm-format](https://github.com/avh4/elm-format) but for F#.  
It was originally created by Anh-Dung Phan and people have suggested that it could be a part of the  
[F# Compiler Service](https://github.com/Microsoft/visualfsharp/pull/3542).

> Fantomas is like [prettier](https://prettier.io) or [elm-format](https://github.com/avh4/elm-format) but for F#.

## .NET Core

The source code of Fantomas is quite advanced so our approach is to focus first on improving the project in general. We noticed it was a bit old in terms of Visual Studio version and dependencies, so we organized the move to [.NET Core](https://github.com/dungpa/fantomas/pull/236).

The port had its challenges but in the end, we were able to release [dotnet-fantomas](https://www.nuget.org/packages/dotnet-fantomas/).

## Test drive

### NuGet

Added the following code to your `fsproj`

    <ItemGroup>
        <DotNetCliToolReference Include="dotnet-fantomas" Version="2.7.1" />
    </ItemGroup>

Execute `dotnet restore` and you should be able to run `dotnet fantomas YourFile.fs`.  
Check out `dotnet fantomas --help` for more options.

### Paket

Add `clitool dotnet-fantomas 2.7.1` to your `paket.dependencies`.  
Add `dotnet-fantomas` to your `paket.references`.

Execute `.paket\paket.exe install` and `dotnet fantomas YourFile.fs` should work as well.

## We need your help

Fantomas still has room for improvement. If we each format one source file and raise an issue on github if things go south, we'd have all the usage coverage we need.

There are still scenarios were the formatting will fail or introduce compile errors. The more concrete examples we have, the easier it is to fix bugs.

Please dear community, give it a spin and write a detailed issue if necessary. Tell us what went wrong, what you'd expected, what framework version you used, why it should format differently, ...

> If we each format one source file and raise an issue on github if things go south, we'd have all the usage coverage we need.

Ping us on the [F# Slack](https://fsharp.slack.com), any feedback is most welcome.

## Final words

I hope you enjoyed this [NuGet package](https://www.nuget.org/packages/dotnet-fantomas/) and can use it in your F# workflow.

Yours truly,  
nojaf
