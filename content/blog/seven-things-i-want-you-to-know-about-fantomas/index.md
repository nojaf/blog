---
path: '2020/11/14/seven-things-i-want-you-to-know-about-fantomas/'
date: '2020-11-14'
title: 'Seven things I want you to know about Fantomas'
tags: ['fp', 'fsharp','opensource']
cover: './nojaf-seven-things-about-fantomas.jpg'
---

## Introduction

As most of you know I'm the current maintainer of the Fantomas project.
I put my heart and soul into this project and there are some things I just want to get off my chest.
Call it little facts I wish someone knew before they open a feature request or report something they think is an issue.
The honest truth is that the work can be very demotivating, it feels like an uphill battle and the best helmsman stand on shore.
I guess that could just be open-source in a nutshell, nevertheless here are seven things I want you to know about Fantomas.

## Why you should use Fantomas in the first place?

Using a formatter removes some cognitive load when writing code.
You don't need to worry about how the code looks like and can just solve the task at hand.
The sub-conscience questions like "Do I need to add a space here?" or "Would I put the closing parenthesis on this line or the next?" disappear.
There is a tool that can take these decisions for you in a consistent way.

## Fantomas suppports two style guides

### Code styles of the many

Everybody writes code right? Consequentially, almost everybody has an opinion on how code should look like.
However, in a project like Fantomas you are not entitled to this opinion. At all.
There are just too many ways of writing F# code and I cannot mainting every style.
A lot of feature request pop up and they all sound like ["Hey, I want something"](https://twitter.com/i/status/1321603336051789824).
Most people have no idea what they are asking in terms of implementation or maintenance.

### This is the way

So, if not everything everyone ever asks, what does Fantomas implement? <br />
Fantomas sticks to two formatting style guides: one [Microsoft](https://docs.microsoft.com/en-us/dotnet/fsharp/style-guide/formatting) wrote and one [G-Research](https://github.com/G-Research/fsharp-formatting-conventions) is using internally.
And going forward, that it folks: nothing more, nothing less.
Stylistic feature request that have nothing to do with either style guide will be closed on sight as explained in our [Contribution Guidelines](https://github.com/fsprojects/fantomas/blob/master/CONTRIBUTING.md#what-are-we-not-looking-for).

#### Microsoft's F# code formatting guidelines

This guide is based on what the original author of Fantomas, Anh-Dung Phan once wrote.
Phillip Carter, program manager of F# at Microsoft, is responsible for this guide.
He can be reasoned with and is open to input.
You can open an issue via the feedback button at the bottom.

Whatever ends up in this guide, I want to be the default style of Fantomas.
As this is an open system, it should be considered the community style guide.

#### G-Research

As many also know, G-Research is a benevolent sponsor of this project.
They had their style guide for years now and decided to put it in the open.
It is based on the Microsoft style guide and has a few different approaches to certain code constructs.
This allows for some nice alternatives on the Microsoft guide and is overall very consistent and readable.
Please note that this is a closed system as G-Research has a clear opinion on things.

#### Everything else

All that does not fit in these guides, will not be picked up in Fantomas.
Fantomas still has a lot of issues, bugs that break the code and the project has to accept that it needs to walk before it can run.

## How LetBindings are formatted

Something that pops up ever once and a while is question on the formatting of multi-line let bindings.
[SynBinding.Binding](https://fsharp.github.io/FSharp.Compiler.Service/reference/fsharp-compiler-syntaxtree-synbinding.html) to be more specific.

Simplified this looks like:
```fsharp
let name pattern = expr
```

Where:

- `name` is the name of the function or value.
- `pattern` are the arguments (if present).
- `expr` is a [SynExpr](https://fsharp.github.io/FSharp.Compiler.Service/reference/fsharp-compiler-syntaxtree-synexpr.html).

As a general and consistent rule Fantomas will indent and add a new line if:

- `expr` exceeds the user defined threshold ([`fsharp_max_function_binding_width`](https://github.com/fsprojects/fantomas/blob/master/docs/Documentation.md#fsharp_max_function_binding_width) or [`fsharp_max_value_binding_width`](https://github.com/fsprojects/fantomas/blob/master/docs/Documentation.md#fsharp_max_value_binding_width))
- `expr` is multi-line

making the result look like:

```fsharp
let name pattern =
    expr
```

<small>When the combination of `name` & `pattern` exceeds the `max-line-length`, it will also be formatted differently, but I digress.</small>

`SynExpr` is a union type that can be about 60 different things (give or take).
It is used all over the place in the AST, so Fantomas has a function `genExpr` to tackle this.

> genExpr is used over 200 times in [CodePrinter.fs](https://github.com/fsprojects/fantomas/blob/master/src/Fantomas/CodePrinter.fs)

`genExpr` does not know where exactly it came from, in other words, the caller does not matter.

Some examples:

```fsharp
let ohSomeFunction () =
    while theEarthIsSpinning () do
        printfn "current time %s" (DateTime.Now.ToString())

let person =
    { Name = "Johnny"
      LastName = "Hallyday"
      Bio = "Quel mec!" }

let somethingElse a =
    let b = a * 42
    // you know some comment
    b
```

Makes sense right?

Well, some people make exceptions to this rule when it comes to certain cases of SynExpr.
SynExpr.Record being one of them.

```fsharp
let person = {
    Name = "Johnny"
    LastName = "Hallyday"
    Bio = "Quel mec!" 
}
```

This is a nightmare to implement in Fantomas and has no real reason to pull of.
Why do this for `SynExpr.Record` and not for `SynExpr.While` or `SynExpr.LetOrUse`?

```fsharp
let ohSomeFunction () = while theEarthIsSpinning () do
    printfn "current time %s" (DateTime.Now.ToString())

// Not even valid code
let somethingElse a = let b = a * 42
    // you know some comment
    b
```

To me this strikes as an inconsistent and not founded quirk in style.
And that is why I don't want this in Fantomas. Records already have two implementations and a third style like the one above is asking for a headache.
In general every multi-line construct that starts after the `=` sign would be considered inconsistent.

By all means, it is perfectly ok to write code like this. Just accept that the formatter will do the sensible thing when formatting.

## Using Fantomas does not change the way you write code

There can be certain distance between the way you write code and the formatted result.
At first this can seem miles apart and you don't want anything to do with it.
I get that, I've been there and I hear ya. However, the peace of mind you gain by using a formatter, will eventually kick in.

> Let go your earthly tether. Enter the void. Empty, and become wind - Zaheer

You still write code the way you always have, you just don't control the result anymore.
The result is based on a community standard and you need to ask yourself: "Who am I to challenge this?".
No, you will never like anything and change is hard but once you let go, you will be at peace.

I stopped caring how my code looks about a year ago and I have no regrets.
Ever since Fantomas is able to format itself, it has been a blessing and I wish to share this feeling with the community.

## There is no reason not to use Fantomas

The phrase "I need feature X before I can use Fantomas at work" also makes my ears bleed.
I would like to debunk this myth and tell you how I perceive these remarks.
The short reply in my mind is the follow: "No good madame or sir, YOU need to accept the output of Fantomas to use this at work".
In general, it puts unnecessary pressure on me as a maintainer and it is uncalled for.
Again, [let it go](https://www.youtube.com/watch?v=L0MK7qz13bU), please drop the audacity that you know better than curated style guides.

If style isn't the issue but Fantomas breaks your code for some reason. Well, there is answer for that as well.
Introducing [.fantomasignore](https://github.com/fsprojects/fantomas/blob/master/docs/Documentation.md#ignore-files-fantomasignore), a way to ignore files from being formatted by Fantomas.
In case of a bug or if you really made a piece of art and don't wish to have it formatted, the ignore file has got you covered. 

## How G-Research sponsors this project

I mentioned the G-Research style guide earlier, so you might be wondering: "What's the deal there anyway?".
[G-Research](https://www.gresearch.co.uk/) has been sponsoring this project for almost two years now.
As part of larger mission to fund open-source initiatives in general. I can't disclose the full story here and I can only say I'm grateful to be a part of this.
What they are doing is absolutely mind-blowing and I hope more companies will one day get inspired by their story.

Gratitude aside, I wish to disclose a bit how this sponsorship works. First of all, G-Research does not solely pay for the features they are interested in.
Not once did they have the intention to take over this project, from the beginning they valued and respected the project and my work.
Secondly, they don't provide me a cup of coffee but are actually buying my time from my employer. Now that needs a bit of context, see I work as .NET consultant for a Belgian company called Axxes.
The open-source team at G-Research has a agreed to professional contracting with Axxes. They pay for my services as any other customer would.
So, this enforces the message that they value the work. Working on Fantomas can be quite complex engineering and I'm happy with this acknowledgment that they buy that time in a time/material formula via my employer.
Axxes knows F# is my greatest passion so they went along and gave G-Research a more friendly open-source day rate.
I'm really happy about how the right people were able to work out this deal and I would like to stress that real money is involved here.

In terms of duration, the contract is not full time and counts twenty days each contract. So I'm not payed all the time I work on Fantomas.
Trust me when I say that Fantomas in its majority is still a love of free labor from my side.
I'm at peace with this and with it comes also the acceptance that I cannot implement everybody wishes.

The entire first contract was used to refactor the code to support our trivia mechanism.
This again highlights that care about Fantomas and not every penny needs to go to support the G-Research style guide.
I asked for a leap of faith and we are today were we are because of this trust.

Lastly, if you are interested in sharing the load of G-Research you can reach out to [sponsoring@fantomas.io](mailto:sponsoring@fantomas.io).

## YouTube channel

It is no secret that I want to see more people contributing to Fantomas. Some bugs can be really straightforward and I want Fantomas to be a project were anyone in the F# community can solve their own problem.
Personally, I'm more of a visual learner. When I can watch a video that explains a concept it seems to stick best.
That is why I started making videos about Fantomas. Answering the vital question: "How does any of this sh*t work?".
I explain the basics of solving a bug and hope to inspire new contributors with this.

Check out the playlist at [https://www.youtube.com/playlist?list=PLvw_J2kfZCX3Mf6tEbIPZXbzJOD1VGl4K](https://www.youtube.com/playlist?list=PLvw_J2kfZCX3Mf6tEbIPZXbzJOD1VGl4K).

### Fantomas &amp; Friends

As continuation of these videos, I launched a new concept: `Fantmas &amp; Friends`. It sounds cheesy and cringe right?
Beside the horrible name (which I like ;) it aims at solving real bugs with people who are less familiar with the codebase.
It is unscripted, not really planned at all and I like the format. I has a certain authentic flair and it proves where there is a will, there is a way.

## Final words

Thank you for reading this blogpost til the end. It was healing to write all these things down and I hope it provides some perspective on the project.

Yours truly,  
nojaf

<span>Photo by <a href="https://unsplash.com/@alextalmon?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alex Talmon</a> on <a href="https://unsplash.com/s/photos/iceland?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

## Using Fantomas does not change the way you write code

## There is no reason not to use Fantomas

- don't wait
- prettier stable
- fantomas ignore