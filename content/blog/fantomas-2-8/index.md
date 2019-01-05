---
path: '2018/07/07/fantomas-global-cli-tool/'
date: '2018-07-07'
title: 'Fantomas 2.8: global .NET Core cli tool!'
tags: ['open-source', 'fsharp']
cover: './nojaf.com.fantomas.2.8.jpg'
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

Photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@valentindotxyz?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Valentin"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Valentin</span></a>

