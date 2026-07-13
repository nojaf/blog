---
path: "2018/07/07/fantomas-global-cli-tool/"
date: "2018-07-07"
title: "Fantomas 2.8: global .NET Core cli tool!"
tags: ["open-source", "fsharp"]
cover: "./nojaf.com.fantomas.2.8.jpg"
photoCredit:
  author: "Valentin"
  username: "valentindotxyz"
---

Hi all,

A quick update regarding the new release of the [Fantomas](https://github.com/dungpa/fantomas) project.

There is a new and shiny [global .NET Core cli tool](https://www.nuget.org/packages/fantomas-tool/).

Install:

> dotnet tool install -g fantomas-tool

The `fantomas` executable will be added to your path.

Another new feature is the [--preserveEOL](https://github.com/dungpa/fantomas/blob/master/docs/Documentation.md#preferences) option.  
This will respect [additional newlines after formatting](https://github.com/dungpa/fantomas/issues/143).

You can check the [release notes](https://github.com/dungpa/fantomas/blob/master/RELEASE_NOTES.md) for all changes in the 2.8 version.

Last but not least there is a rumor that the project might move to the [fsprojects](https://github.com/fsprojects) organization. This could lead to more people being involved in the project.

Many thanks for everyone that was involved in this release.

Enjoy,

le mec nojaf

UPDATE: Fantomas did indeed move to [fsprojects](https://github.com/fsprojects/fantomas).
