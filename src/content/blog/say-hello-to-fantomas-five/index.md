---
path: "2022/08/25/say-hello-to-fantomas-five/"
date: "2022-08-25"
title: "Say Hello to Fantomas 5"
tags: ["open-source", "fsharp", "fantomas", "tooling"]
cover: "./blog.nojaf.com-say-hello-to-fantomas-five.jpg"
---

## Introduction

**Fantomas 5** is here! The API of v5 is finalized! In this blogpost I will explain how you can migrate to v5 from v4.

The latest preview versions are labelled as beta's, meaning **the API is stable**.  
Please start using these latest versions, as the final product will be very close to what is out there today.

Install Fantomas using

> dotnet tool install fantomas --prerelease

## What changed?

Under the good, we achieve a massive performance boost. I explained this in a [previous blogpost](/2022/05/24/word-domination-part-one/), Fantomas v5 is **twice or more**, as fast as v4. Achieving this required some serious changes and a major version update.

> It is twice as fast, maybe even faster

### House keeping

I firmly believe in semantic versioning. If a feature is introduced, and part of the public API, you cannot simply remove it the next release.
This level of stability is understandably a blessing, but also a curse when we also need to carry the weight of some choice that have not yielded the benefits that were initially anticipated.
A major release is one of the rare opportunities where we can really question every past decision.

### Removal

There are some settings and features that were completely removed.
These settings were very much legacy and not specified anywhere in any of [the F# style guides](https://fsprojects.github.io/fantomas/docs/end-users/StyleGuide.html).

If you have the following setings in your `.editorconfig`, please remove them, as they no longer have any influence on the working of Fantomas.

- fsharp_semicolon_at_end_of_line
- fsharp_keep_if_then_in_same_line
- fsharp_indent_on_try_with

### Change

We streamlined a few settings for efficiency's sake. Please read our [changelog](https://github.com/fsprojects/fantomas/blob/master/CHANGELOG.md) to get the full scoop, or visit our [announcement issue](https://github.com/fsprojects/fantomas/issues/2160).
Here are some of the most interesting changes:

#### Fantomas.Core and fantomas

The NuGet package `Fantomas` was renamed to `Fantomas.Core`. This was done to free up the name `fantomas`, so it can be used as the name for the command line tool, previously known as `fantomas-tool`.

#### Revisit Elmish

Elmish-inspired code is one of those nice-to-have features, but it didn't make sense to enable this by default. We choose to remove the default Elmish behaviour that came with the default settings and move all things Elmish to the experimental Stroustrup feature.

`fsharp_disable_elmish_code` should be removed from your `.editorconfig`.

#### Single argument web mode

We took a step back when it came to Elmish domain- specific languages and tried to come up with something more generalized.
The default Elmish behaviour (a function with two lists) and its sibling feature `fsharp_single_argument_web_mode` (a function with a single list) are now one and the same feature.
The setting is also a bit more flexible so that, for example, it can become more usable for [Expecto tests](https://fsprojects.github.io/fantomas-tools/#/fantomas/preview?data=N4KABGBEDGD2AmBTSAuKAbRAXMXEGct8wBeAHQCcyA7CPQgGQEtCwzIBBXAnAcwtgBXAA7swAbUo0IdHm0ixqiboTHAptGRACiAD2GJoWAHSIAjoICG6MAAoATAGp7ASjAAWeU-vsNWgL4afjL0OOyW1LBYABaIFCo4MZY4AGaWTOj4asFaegZGphbWdgDMjiVuAKzyZSW%2BVJoQgQ05CRz4AJ7U0PIxLGD9EWCWnd0J2Q1aEJhYAIRguqTDoz3AYBTYghS0ns3SU3mGJuZWNosOzm7s3vX7TUGTITwAKiMA1r3R-YO47%2BOQYHUjy0M3mtBIYFe%2BDexgAYgIALYAJQIgnQOB8wJkhwKJ2KtHs8moJB8kFae00AF1ggAfAB8CQYlgARogbOx8JYEcJMFkyS0GgB6QVgADK2CwTGovHwKA0wokACpjMAUvgADRq3T%2BalCkVq6KWCjCAD6CLRkvQUsQJuZ6Fg0Detoolkd2HwJsUJs5CJtcHQggRxKwFEEiHl%2BvwhuNJsQ%2BjiTF91Cw1m9IaEhFDpsIHUwJBDYag6vAUHwEqlMtQEhLEFAUygABIsB0DFXIFKsJBi-XIA2AG7WMNV8Q1qYABm79agAElqEhk6KmAAvZCT%2BvuUcQSmj-xrwGbxvN1todvJrsH3sDgPINAjqdgACMe60kAAspZdMwlAxENKYuf7wfewxwPbcAj3Ospl7I8bygX94AAeRSL9EFFZtMAAqD%2B0HWC7ynexnxkSBtDnJCUMwnt0BSSBQJ3CCLybFtYMgZlYFgdAKKI7Dr2HA8IBKQiIEgWcywoLBYSlawADlEAAdytJROK0AtEFo8DR0gl9GOPKBWPYpTGyvIdbz4jxBKgUVhFdRAACFEBSWANgABSNLlsDiAy6FDVT6zAmRdw0hiYLbPSOMIy8cN4%2B9KnMyBLOsuyHI2BhYFkuJoBGRBZz7B1kiYRRPNwby1P8%2Bie205jQoMiKeJM%2B8ADZYvi6BbPsxzEAAVWEAwKAyststyyUCvMtJMh8qY-KaMqsOCk8qvC7jjOre8AHYmqslrEvagBhdARnwbbFEzQQjEcwrRrLEqpsC8rZt0tiwoYozcNMgAOdaErajZX0QBFWQoc7rEu3y6JumamJCh7qsWl77wATg%2BzavsQQ77WoQGxqusAAq0TSuLulioYW56oqnB8J1MuKNsQDgUjwChDoRBFLEKlSsZxmQ8aEirIf04nIrqsmn0p5rWqS1DfqYf1htMi7xq0SbsemrSCfmp6BeWsmCJF6nafp8UESl9iZfvNmQfU3GgohuaifV2rNfrB8BJ16yOAEQQ5wAETZRMmHp1nivN0qwZV62oA7aGScFx33Fi99dGnFJnliahRWiRysAAdSYeB-3MkCg%2Buy3brD09O35%2B28MdmLKfjxPk9-bQxrTjPs9z6JCvqguJtB4vwZ0svI41qupgfRra4-WcUiYXQEJ65JHLyDZ8HwfL0fM17u4V3vOatgeI4rpaR60B81on3QUTgCh4DbvPTPcLeZEVjnaz35iD7to-TIfd7z8vxz4BSUDP9JC048AInwIVB87Nlb41LuadEGRrSwkcszLA9NngQ0PrDMmCNKb-2vq%2BC0SClAoIoGg-2sVoDRldPTE0skc7-hgSHOB%2B8zzYNJvWYCccPxuxdB0BCFBmCEFvh3Dej8tw71fiXNh5dP44K4cLe8b5eEUH4YI4RWAgF-TiKA8BkDzLQMLkrFh3MCYIMtMg1ByQMFYPkZwqY9htbKL4ZYARQiWBYCIYghSiAyEUI8lQmhRg4j0MYR3ZhfdQ6yKHpXUy9hnbKPjgANRwjZKU8AKyiMKpvSJu8ZHv3YfY6OjjY7n1hB7Iwa90lziyeEwqD88nSP7oUuR5Uo4O0cTXJJH5PZRAAOLYCXgQVeihsniKafuApvNHrtOHvE8eSTiG%2BJsvaR0NkXRuiIAhVOblUaBnXqZM2PcLb5JaTM2JX97z2DPsomS8lrR2SwGlX8mCDDe2ntQP2a8OBzh%2BjoigBijmBxOcHKJrDKq2zmXE65v8XFWl4NQCp3QhqpyYIi5IWxEDPFgLOecKZUUY2BqCouZzomQr5sUzpWh7B4PhfTageU%2ByIBStKf5-0PlSm%2BUdIl8sn5SKmecm2lLoVXKnCUCmSzEEoSZH9eAlhdqwFXtKe5vjeWTK5oeUuatRUKKmCUJRU5iLxgoImX8KZ0AAGlECIGEHi81s4NkRGoeq4xL9BXkouRwkpWgSjOKNasiIbwUL4DdkIOcMlCCIHgN4yxShhkrzXkC02ILt6nOaZ64VsysIdOPjIEoiSA1Gi2hsT2LBoCmsNoyvA8AOpfMUN7aAe0XSEpGkDPlkj00eohV6qleb%2BJlOUYcSt5rrBoXdsdYQaFcyrmBWGDVb82wf11Q4313SjXWttfHbRICUiBuoMG60yayZjgkWAZ%2BsCzHaqhTm%2BZ94SiLKNeOqWXiECzvvHLdmJZKSTnbPgWEq8qyfv8EAA).

To enable it, you need to add two settings: the existing `fsharp_multiline_block_brackets_on_same_column` setting, and the new `fsharp_experimental_stroustrup_style` setting.

`fsharp_single_argument_web_mode` should be removed from your `.editorconfig`.

Why do I need two settings? Well, because Stroustrup is more of an extension of `fsharp_multiline_block_brackets_on_same_column` and it builds upon it.

### Addition

Besides the core development of v5, there are also some community-driven features.

#### Keep max empty lines

Fantomas tries to respect the newlines you had in the original source code. The main reason for this is that it is very hard to come up with a good heuristic for when to introduce or remove newlines.

```fsharp
if foo then
   a

myFunction arg1 arg2
```

Fantomas will, in this example, restore the newline between `if/then` and the `myFunction` function call.

However, if there were multiple blank lines between these code blocks, Fantomas would restore each one of them.

In v5, we've added a new setting that allows you to limit the amount of subsequential newlines that are are being restore.
This amount can be controlled by `fsharp_keep_max_number_of_blank_lines`.

#### Stroustrup

A controversial addition to v5 is the ability to format some code structures according to the [Stroustrup style](https://en.wikipedia.org/wiki/Indentation_style#Variant:_Stroustrup).
This style is quite popular in the F# community and there have been requests for it for some time now. More details about the origin of this setting can be found in [#1408](https://github.com/fsprojects/fantomas/issues/1408).

```fsharp
type MyRecord = {
    X: int
    Y: int
    Z: string
}

let myRecordInstance = {
    X = 1
    Y = 2
    Z = ""
}

let myAsyncFunction a b c = async {
    let! d = otherAsyncFunction a b
    return d + c
}
```

The key problem with this feature request is that it is not a part of any F# style guide. This makes it hard on the maintainers to judge whether this setting is worth the maintenance trouble.
It is **quite an impactful change** and **affect a lot of areas of the code base**. Very few people understand this impact when discussing about the code- style of things 😔.

It also doesn't help that we already have two existing ways of dealing with this. A third option is excessive.
Especially when you consider this is not a paid product and they’re very few active contributors to the project.

Luckily, a recent issue was raised on the [F# style guide repository](https://github.com/fsharp/fslang-design/issues/706). Please engage in this thread and help us come to a positive solution.

Because this feature wasn't discussed or properly debated, everything is still in an early stage. This will surely evolve over time, and time will tell where this is going.

##### The inner workings

The way Stroustrup works is that for certain multiline expressions the code is being printed on the current line instead of on the next line. This requires knowledge of the junction of two code constructs.
Instead of rewriting these exact circumstances entirely, we made a trade-off at the junction, and let the second expression play out like it would when the `fsharp_multiline_block_brackets_on_same_column` is enabled.

To pull this off, you need to enable `fsharp_multiline_block_brackets_on_same_column’` in order to achieve valid code and the expected result.
**The technical changes to the code base were very drastic**, so the decision was made to piggy-back on an existing setting. This is the reason why you need to enable both settings.

```fsharp
// fsharp_multiline_block_brackets_on_same_column = true
let myRecordInstance =
    {
        X = 1
        Y = 2
        Z = ""
    }

// fsharp_multiline_block_brackets_on_same_column = true
// fsharp_experimental_stroustrup_style = true
let myRecordInstance =  {
    X = 1
    Y = 2
    Z = ""
}

// The extra setting, will at certain junctions print the code at the current line, leading to the Stroustrup effect.
```

## Thanks to my sponsor, G-Research

I am grateful for the **substantial support** I have received from [G-Research](https://www.gresearch.co.uk/).
It has allowed me to work on Fantomas for full working-days and really take the project to the next level – from Fantomas V4 to Fantomas V5.

![G-Research logo](./g-research.jpg)

## Release party 🥳

I would like to announce the official launch of Fantomas V5:
On September 16th at 6PM (CEST), we will have a grand release feast on our [Discord server](https://discord.gg/rUTUmq3n?event=1010483519073558539).

Please join us to celebrate!

Cheers,

Florian

Photo by <a href="https://unsplash.com/@florianwehde?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Florian Wehde</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
