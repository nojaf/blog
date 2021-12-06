---
path: '2021/12/07/fs-advent-2021-fantomas-daemon/'
date: '2021-12-07'
title: 'Fantomas Daemon'
tags: ['open-source', 'fsharp', 'fantomas', 'tooling' ]
cover: './nojaf.com.fantomas-daemon-fsadvent-2021.jpg'
---

## Intro

The F# advent calendar is a wonderful initiative that inspires the community to create new content in a short period of time.
I've been fortunate enough to be part of this for some years now. This year, I had in mind to sit this one out actually.
Sometimes, there are just no new tales to tell and it is better suited to give others an opportunity.
When I noticed that [Sergey still had some spots left to fill](https://twitter.com/sergey_tihon/status/1459794038115155969?s=20), I did happily volunteer, thought didn't think it through that much.

My original thoughts for this post, was to create some content around the F# compiler. 
To the benefits of the Fantomas project, I have been contributing [some PR's to the compiler](https://github.com/dotnet/fsharp/pulls?q=is%3Apr+author%3Anojaf) and I wanted to elaborate a bit how a change there can simplify Fantomas.
This idea for a blogpost sounds reasonable, but life happens and I don't have this content ready at the time of writing.
So, instead I'd like to write about some of the recent Fantomas changes. Partly because I know this stuff quite well, and partly because it something that I'm proud of.

## Pre-Daemon mode

The next version of [Fantomas 4.6](https://github.com/fsprojects/fantomas/tree/4.6) will contain an improvement in IDE integration.
Versions 4.5 and prior were available in Ionide, Rider and the Visual Studio extensions.
Installing those plugins or IDE was sufficient to format code using a shortcut or action.
Doing this, would call the format function that is present in the [Fantomas NuGet package](https://www.nuget.org/packages/Fantomas/).
Not only found this format the current file, it would also sync up with the rest of the editor intellisense.
*And that really is a relevant integration aspect* that you would not get when you format the code using the commandline.

The **downside** of this optimal **integration** is that you are **not in control of the version that is being used in the editor**.
Fantomas bugfixes almost happen on a weekly basis. I encourage people to scratch their own itch 
and many people are able to contribute after checking out the [Contribution Guidelines](https://github.com/fsprojects/fantomas/blob/master/CONTRIBUTING.md) and watching some [YouTube videos](https://www.youtube.com/playlist?list=PLvw_J2kfZCX3Mf6tEbIPZXbzJOD1VGl4K).

Solving your own bug is very rewarding and I try to publish these fixes to NuGet frequently.
Unfortunately, having a fix on NuGet doesn't bring it available in your IDE.
> The stars really have to align before newer versions of Fantomas can be integrated.
Mainly, because the version of FCS has to be in sync with what the editor has and well that can be challenging.

Another downside that the IDE controls the version of Fantomas, is that you can have formatted a file yesterday and have a different result today.
You notice this in your source control diff and that is overall just not what you want.

## Daemon mode

To move beyond this limitation, we tried to rethink how the editor integration should look like.
What if you could bring your own version of Fantomas? Well, you can do this today by installing it as a local .NET tool.
This works, but lacks the editor integration.

In 4.6 we tried to solve this problem by introducing [Fantomas.Client](https://www.nuget.org/packages/Fantomas.Client/), a companion NuGet package for editors.
The client exposes a `FantomasService` that can execute the traditional format requests as found in `Fantomas`, but it proxies those to [fantomas-tool](https://www.nuget.org/packages/fantomas-tool/) instead.
When formatting inside an editor, `Fantomas Client` will try and find a compatible version for the current file and spin up a daemon process of `fantomas-tool`.
This daemon process will act as an [LSP server](https://microsoft.github.io/language-server-protocol/) that send json messages back and forward to the `FantomasService`.
As user of an editor, you don't need to worry about `Fantomas.Client`, just know that the editor will use a locally or globally installed version of `fantomas-tool`.
Meaning, you control the version and you upgrade at your own pace.

At the time of writing, there is support for VSCode (as part of the Ionide plugin).
If you have Ionide installed, it will prompt you to install `fantomas-tool` if no compatible version can be found.
After installing, you should be good to go as demonstrated in this video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/1jb6K_HZaEY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Post-Daemon mode

My hopes are that we can ship bug fixes to Fantomas at a high pace. If it gets on NuGet, it can be used in your IDE.
Ever since 4.5, I have been releasing revisions on a frequent pace and people seem to have faith in this.
Download numbers are significantly higher than say the first alpha of 4.4. Alpha and beta just don't have a stable ring to it for most people.
I completely understand this, and that is why I'd like to move forward to a model were bugfixes are considered stable and people should not fear to upgrade.
There is truth to this as these revisions mostly contain a fix for problem and nothing more.

## What about Rider and Visual Studio?

JetBrains has slightly different plans, although it is on their radar to support custom versions of Fantomas.
They won't go with `Fantomas.Client` for technical reason as can be read in [this GitHub issue](https://github.com/JetBrains/resharper-fsharp/issues/320).

Integration of `Fantomas.Client` is ongoing for the Visual Studio extension.
Progress can be tracked [here](https://github.com/fsprojects/fantomas-for-vs/issues/21). Please don't hesitate to contribute any of the remaining work.

## Acknowledgements

During the development of `Fantomas.Client`, I had a lot of mentoring by [Chet Husk](https://github.com/baronfel) (the one and only `@baronfel` on GitHub).
We working together on the Ionide integration in FSAutocomplete (or F-Sack as the cool kids say it).
And over a timespan of several months we were able to come up with a prototype.

For the Visual Studio integration I'd like to thanks [Christopher-Marcel Esser](https://github.com/bddckr) and [Asti](https://github.com/deviousasti).
Christopher-Marcel implemented the port to `Fantomas.Client` and Asti is the core maintainer of the project.

## Closing thoughts

The whole Fantomas daemon thing is pretty mind-blowing. We can upgrade to different compiler version without a breeze.
This used to take months and always involved a lot of coordination. Now it happens overnight.

If you have any further question about this, you can always reach out to our gitter channel.

Enjoy the rest of the advent calendar, happy holidays and stay safe!

Cheers,

Florian

<span>Photo by <a href="https://unsplash.com/@donnehhhh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Donovan Reeves</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
  