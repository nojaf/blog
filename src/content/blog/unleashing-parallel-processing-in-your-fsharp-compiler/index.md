---
path: "2023/08/22/unleashing-parallel-processing-in-your-fsharp-compiler/"
date: "2023-08-22"
title: "Unleashing Parallel Processing in Your F# Compiler"
tags: ["open-source", "fsharp", "tooling"]
cover: "./blog.nojaf.com-unleashing-parallel-processing-in-your-fsharp-compiler.jpg"
---

## Intro

Hey there, let's cut to the chase: the dotnet `7.0.400` SDK release brings some feature flags that can turbocharge your F# compiler.  
In this post, I'm shining a spotlight on three of these gems that you absolutely need to give a spin.

## Setup

First things first, you need the latest [SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) (`7.0.400` and beyond). Then, let's tweak some `<OtherFlags>` to fine-tune the F# compiler in MSBuild.  
Just drop this snippet into your `*.fsproj` or `Directory.Build.props` file:

```xml
<OtherFlags>$(OtherFlags) --test:GraphBasedChecking --test:ParallelOptimization --test:ParallelIlxGen</OtherFlags>
```

([sample](https://github.com/fsprojects/fantomas/blob/0156a914d08a780745e777c995164be746c926f6/Directory.Build.props#L37))

Want to double-check if it's working? Run `dotnet build --no-incremental -v n` and spot the extra compiler flags in `CoreCompile`:

```
C:\Program Files\dotnet\dotnet.exe "C:\Program Files\dotnet\sdk\7.0.400\FSharp\fsc.dll" -o:obj\Debug\netstandard2.0\YourProject.dll
...
--test:GraphBasedChecking
--test:ParallelOptimization
--test:ParallelIlxGen
```

But what magic do these flags weave, you ask? They sprinkle their fairy dust over [the various phases of F# compilation](https://github.com/dotnet/fsharp/blob/main/docs/overview.md#key-compiler-phases).  
Now, let's keep it breezy on the technical stuff:

- `--test:GraphBasedChecking` juggles type-checking in parallel, wherever possible. [See dotnet/fsharp#14494](https://github.com/dotnet/fsharp/pull/14494)
- `--test:ParallelOptimization` hosts a parallel party during certain optimization phases. [See dotnet/fsharp#14390](https://github.com/dotnet/fsharp/pull/14390)
- `--test:ParallelIlxGen` orchestrates parallel code generation for method bodies in the IlxGen dance. [See dotnet/fsharp#14372](https://github.com/dotnet/fsharp/pull/14372)

It's a kinda magic, that's what! ✨🎩

## Credit

Big shout-out to [Janusz Wrobel](https://github.com/safesparrow) and [Tomas Grosup](https://github.com/t-gro) – these rockstars took the compiler to new heights! Their skills and hustle are seriously awe-inspiring. As for me, well, let's just say I added my own sprinkle of magic to the mix. Teamwork at its finest, folks! 🚀🌟

## Closing thoughts

<div id="try-out-compiler-flags">
You really need to try out these flags!<br />
Otherwise there is no way of telling if this can ever become the default in dotnet 8!
</div>

Clear enough I hope 😸.

Cheers,

Florian
