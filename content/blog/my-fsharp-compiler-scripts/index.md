---
path: '2023/02/02/my-fsharp-compiler-scripts/'
date: '2023-02-02'
title: 'My F# compiler scripts'
tags: ['open-source', 'fsharp', 'tooling' ]
cover: './blog.nojaf.com-my-fsharp-compiler-scripts.jpg'
---

## Intro

For the last year, I've been working quite extensively in the [dotnet/fsharp](https://github.com/dotnet/fsharp) codebase.  
I've picked up a couple of habits and created some helper scripts along the way.  
This is some stuff that works for me and it might be insightful for you. Or not.  
In this blog post, I'm going over some of my frequently used scripts. 
Some are general purpose, others are very specific to the F# compiler codebase.

## PowerShell profile

I've always been a Windows guy and thus `pwsh` is my go-to. <small>(`pwsh` is cross-platform though)</small>
Having multiple terminal windows open is the norm and I frequently add (or alias) functions in my [$PROFILE](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3).  
I'll go over some of my frequently used functions in my `$PROFILE`, in no particular order.

## Copy current location

```powershell
function Copy-CurrentLocation() {
    $pwd.Path | clip
}

Set-Alias -Name "ccp" -Value Copy-CurrentLocation
```

This copied the current location of your terminal session to your clipboard.

## Remove recursively and forced

```powershell
function Remove-ForceRecurse($path) {
    Remove-Item $path -Recurse -Force
}

Set-Alias -Name "rmf" -Value Remove-ForceRecurse
```

Self-explanatory, I use this a lot.

## Sync git fork

```powershell
function Sync-Master(){
    git checkout master
    git fetch upstream
    git rebase upstream/master
    git push
}

function Sync-Main(){
    git checkout main
    git fetch upstream
    git rebase upstream/main
    git push
}
```

This is based on the [Updating your fork](https://github.com/dotnet/fsharp/blob/main/DEVGUIDE.md#updating-your-fork) section from the F# dev guide.

## Format changed

```powershell
function Format-Changed(){
    $root = git rev-parse --show-toplevel
    Push-Location $root
    $files = git status --porcelain | Where-Object { ($_.StartsWith(" M") -or $_.StartsWith("AM")) -and (Test-FSharpExtension $_) } | ForEach-Object { $_.substring(3) }
    & "dotnet" "fantomas" $files
    Pop-Location
}
```

Format the files you have touched in a git repository with the local Fantomas installation.

## Surface area

```powershell
function Surface-Area() {
    $env:TEST_UPDATE_BSL=1 
    dotnet test tests/FSharp.Compiler.Service.Tests/FSharp.Compiler.Service.Tests.fsproj --filter "SurfaceAreaTest"
    dotnet test tests/FSharp.Compiler.Service.Tests/FSharp.Compiler.Service.Tests.fsproj --filter "SurfaceAreaTest"
    dotnet test tests/FSharp.Compiler.Service.Tests/FSharp.Compiler.Service.Tests.fsproj --filter "SurfaceAreaTest" -c Release
    dotnet test tests/FSharp.Compiler.Service.Tests/FSharp.Compiler.Service.Tests.fsproj --filter "SurfaceAreaTest" -c Release
}
```

When you change certain bits in the `FSharp.Compiler.Service` project, you can break the public API of the binary.  
For me, this happens frequently when I touch `SyntaxTree.fsi`.  
It is a pain to update the baseline, so I wrapped it into a function that can be called at the repository root.

## Kill dotnet

```powershell
function Kill-DotNet() {
    Get-Process -Name "dotnet" | Kill
    Get-Process -Name "msbuild" | Kill
}
```

The F# compiler build scripts can potentially create some `dotnet` or `msbuild` ghost processes. This can lock certain `dll` files and can interrupt a `git clean -xdf`.
When I had enough of that, I just `Kill-DotNet`.

## Watch tools

```powershell
function Watch-Tools() {
    Push-Location "C:\Users\nojaf\Projects\fantomas-tools"
    & dotnet fsi build.fsx -p "Fantomas-Git"
    & dotnet fsi build.fsx -p "Watch"
    Pop-Location
}
```

I use [Fantomas Tools](https://fsprojects.github.io/fantomas-tools/#/) a lot. You can view the untyped `AST` in one of the tabs, which is quite useful.

## `ls` but with full paths

```powershell
function Get-ChildItemFullPath($path) {
    Get-ChildItem $path | Select-Object -ExpandProperty FullName
}

Set-Alias -Name "lsf" -Value Get-ChildItemFullPath
```

Instead of `ls my-dir`, use `lsf my-dir` and I get the full paths.

## Ready to run the local compiler

```powershell
function ReadyToRun() {
    & dotnet publish .\src\fsc\fscProject\fsc.fsproj -c Release -r win-x64 -p:PublishReadyToRun=true -f net7.0 --no-self-contained
}
```

This will create the `fsc.exe` as it will be shipped with the dotnet SDK. Execute in the repository root.  
It also creates `fsc.dll`, which you can plug into your local `fsproj` file:

```xml
<PropertyGroup>
    <!-- local compiler, picked up by MSBuild -->
    <DotnetFscCompilerPath>C:\Users\nojaf\Projects\fsharp\artifacts\bin\fsc\Release\net7.0\win-x64\fsc.dll</DotnetFscCompilerPath>
</PropertyGroup>
```

typically combined with some specific compiler flags, these can be set by:

```xml
<PropertyGroup>
    <DotnetFscCompilerPath>C:\Users\nojaf\Projects\fsharp\artifacts\bin\fsc\Release\net7.0\win-x64\fsc.dll</DotnetFscCompilerPath>
    <!-- Special flags, that could only be relevant to my local compiler -->
    <!-- Checkout https://github.com/dotnet/fsharp/pull/14494 to learn more about parallel type-checking in compilation -->
    <OtherFlags>--test:GraphBasedChecking --test:DumpCheckingGraph --deterministic-</OtherFlags>
</PropertyGroup>
```

## Create F# compiler arguments

```fsharp
function Get-ArgsFile($project) {
    & dotnet fsi "C:\Users\nojaf\Projects\scripts\fsharp\args-file.fsx" $project
}
```

Sometimes you want to just run `fsc.exe` for an existing project. The `Get-ArgsFile` function will invoke an `F#` script that will scrape the arguments from an existing `dotnet build` run.

`args-file.fsx` looks like:

```fsharp
#r "nuget: CliWrap, 3.6.0"
#r "nuget: MSBuild.StructuredLogger, 2.1.746"

open System.IO
open Microsoft.Build.Logging.StructuredLogger
open CliWrap

/// Create a text file with the F# compiler arguments scrapped from a binary log file.
/// Run `dotnet build --no-incremental -bl` to create the binlog file.
/// The --no-incremental flag is essential for this scraping code.
let mkCompilerArgsFromBinLog file =
    let build = BinaryLog.ReadBuild file

    let projectName =
        build.Children
        |> Seq.choose (
            function
            | :? Project as p -> Some p.Name
            | _ -> None
        )
        |> Seq.distinct
        |> Seq.exactlyOne

    let message (fscTask: FscTask) =
        fscTask.Children
        |> Seq.tryPick (
            function
            | :? Message as m when m.Text.Contains "fsc" -> Some m.Text
            | _ -> None
        )

    let mutable args = None

    build.VisitAllChildren<Task>(fun task ->
        match task with
        | :? FscTask as fscTask ->
            match fscTask.Parent.Parent with
            | :? Project as p when p.Name = projectName -> args <- message fscTask
            | _ -> ()
        | _ -> ()
    )

    match args with
    | None -> printfn "Could not process the binlog file. Did you build using '--no-incremental'?"
    | Some args ->
        let content =
            let idx = args.IndexOf "-o:"
            args.Substring(idx)

        let directory = FileInfo(file).Directory.FullName

        let argsPath =
            Path.Combine(directory, $"{Path.GetFileNameWithoutExtension(projectName)}.args.txt")

        File.WriteAllText(argsPath, content)
        printfn "Wrote %s" argsPath

let project = Array.last fsi.CommandLineArgs

if not (File.Exists project) then
    failwithf "%s does not exist" project

if not (project.EndsWith(".fsproj")) then
    failwithf "%s is not an fsharp project file" project

Cli
    .Wrap("dotnet")
    .WithArguments($"build {project} -bl --no-incremental")
    .ExecuteAsync()
    .Task.Wait()

let binLogFile = Path.Combine(FileInfo(project).DirectoryName, "msbuild.binlog")

mkCompilerArgsFromBinLog binLogFile
```

The main gist is that you build your project and create a `msbinlog` file. Open that file and look for the `fsc` arguments.

Once you have an `MyProject-args.txt` file you can pass it to your local `fsc.exe` invocation:

```powershell
# Create arguments file
Get-ArgsFile .\Fantomas.Core.fsproj

# In PowerShell, mind the `&`
& "C:\Users\nojaf\Projects\fsharp\artifacts\bin\fsc\Release\net7.0\win-x64\publish\fsc.exe" "@./Fantomas.Core.args.txt" --times
```

Also notice that you need to put an `@` character before the path to your `args.txt` file. (Otherwise, the compiler doesn't pick this up)    
`--times` is an additional argument that shows you more timings of each phase in the compilation:

```
Microsoft (R) F# Compiler version 12.5.0.0 for F# 7.0
Copyright (c) Microsoft Corporation. All Rights Reserved.
--------------------------------------------------------------------------------------------------------
|Phase name                          |Elapsed |Duration| WS(MB)|  GC0  |  GC1  |  GC2  |Handles|Threads|
|------------------------------------|--------|--------|-------|-------|-------|-------|-------|-------|

warning FS0075: The command-line option 'times' is for test purposes only
|Import mscorlib+FSharp.Core         |  0.1732|  0.1350|    129|      0|      0|      0|    268|     28|
|Parse inputs                        |  0.2423|  0.0624|    167|      0|      0|      0|    349|     49|
|Import non-system references        |  0.2691|  0.0227|    192|      0|      0|      0|    349|     49|
|Typecheck                           |  1.4108|  1.1378|    814|      2|      1|      1|    411|     69|
|Typechecked                         |  1.4151|  0.0003|    814|      0|      0|      0|    411|     69|
|Write Interface File                |  1.4186|  0.0000|    814|      0|      0|      0|    411|     69|
|Write XML doc signatures            |  1.4239|  0.0019|    814|      0|      0|      0|    411|     69|
|Write XML docs                      |  1.4294|  0.0021|    814|      0|      0|      0|    411|     69|
|Encode Interface Data               |  1.4857|  0.0528|    842|      0|      0|      0|    412|     69|
|Optimizations                       |  1.7403|  0.2507|   1010|      0|      0|      0|    550|     69|
|Ending Optimizations                |  1.7444|  0.0000|   1010|      0|      0|      0|    550|     69|
|Encoding OptData                    |  1.7543|  0.0063|   1011|      0|      0|      0|    550|     69|
|TAST -> IL                          |  2.3593|  0.6014|   1343|      0|      0|      0|    552|     69|
|>Write Started                      |  2.3677|  0.0031|   1345|      0|      0|      0|    554|     69|
|>Module Generation Preparation      |  2.3738|  0.0021|   1346|      0|      0|      0|    554|     69|
|>Module Generation Pass 1           |  2.3945|  0.0172|   1354|      0|      0|      0|    554|     69|
|>Module Generation Pass 2           |  2.4642|  0.0659|   1398|      0|      0|      0|    554|     69|
|>Module Generation Pass 3           |  2.4720|  0.0039|   1399|      0|      0|      0|    554|     69|
|>Module Generation Pass 4           |  2.4768|  0.0013|   1400|      0|      0|      0|    554|     69|
|>Finalize Module Generation Results |  2.4814|  0.0003|   1400|      0|      0|      0|    554|     69|
|>Generated Tables and Code          |  2.4874|  0.0025|   1400|      0|      0|      0|    554|     69|
|>Layout Header of Tables            |  2.4909|  0.0001|   1400|      0|      0|      0|    554|     69|
|>Build String/Blob Address Tables   |  2.5071|  0.0114|   1405|      0|      0|      0|    554|     69|
|>Sort Tables                        |  2.5118|  0.0000|   1405|      0|      0|      0|    554|     69|
|>Write Header of tablebuf           |  2.5193|  0.0038|   1407|      0|      0|      0|    554|     69|
|>Write Tables to tablebuf           |  2.5229|  0.0000|   1407|      0|      0|      0|    554|     69|
|>Layout Metadata                    |  2.5267|  0.0000|   1407|      0|      0|      0|    554|     69|
|>Write Metadata Header              |  2.5302|  0.0001|   1407|      0|      0|      0|    554|     69|
|>Write Metadata Tables              |  2.5336|  0.0001|   1407|      0|      0|      0|    554|     69|
|>Write Metadata Strings             |  2.5369|  0.0000|   1407|      0|      0|      0|    554|     69|
|>Write Metadata User Strings        |  2.5406|  0.0002|   1407|      0|      0|      0|    554|     69|
|>Write Blob Stream                  |  2.5450|  0.0010|   1408|      0|      0|      0|    554|     69|
|>Fixup Metadata                     |  2.5487|  0.0002|   1408|      0|      0|      0|    554|     69|
|>Generated IL and metadata          |  2.5536|  0.0016|   1408|      0|      0|      0|    554|     69|
|>Layout image                       |  2.5616|  0.0040|   1409|      0|      0|      0|    555|     69|
|>Writing Image                      |  2.5663|  0.0010|   1409|      0|      0|      0|    554|     69|
|>Signing Image                      |  2.5697|  0.0000|   1409|      0|      0|      0|    554|     69|
|>Write Started                      |  2.5746|  0.0004|   1410|      0|      0|      0|    555|     69|
|>Module Generation Preparation      |  2.5798|  0.0018|   1411|      0|      0|      0|    555|     69|
|>Module Generation Pass 1           |  2.5963|  0.0131|   1417|      0|      0|      0|    555|     69|
|>Module Generation Pass 2           |  2.7748|  0.1748|   1528|      0|      0|      0|    555|     69|
|>Module Generation Pass 3           |  2.7818|  0.0028|   1529|      0|      0|      0|    555|     69|
|>Module Generation Pass 4           |  2.7867|  0.0014|   1530|      0|      0|      0|    555|     69|
|>Finalize Module Generation Results |  2.7910|  0.0001|   1531|      0|      0|      0|    555|     69|
|>Generated Tables and Code          |  2.7947|  0.0002|   1531|      0|      0|      0|    555|     69|
|>Layout Header of Tables            |  2.7983|  0.0001|   1531|      0|      0|      0|    555|     69|
|>Build String/Blob Address Tables   |  2.8131|  0.0115|   1535|      0|      0|      0|    555|     69|
|>Sort Tables                        |  2.8169|  0.0000|   1535|      0|      0|      0|    555|     69|
|>Write Header of tablebuf           |  2.8244|  0.0039|   1536|      0|      0|      0|    555|     69|
|>Write Tables to tablebuf           |  2.8281|  0.0000|   1536|      0|      0|      0|    555|     69|
|>Layout Metadata                    |  2.8319|  0.0000|   1536|      0|      0|      0|    555|     69|
|>Write Metadata Header              |  2.8353|  0.0001|   1536|      0|      0|      0|    555|     69|
|>Write Metadata Tables              |  2.8397|  0.0001|   1536|      0|      0|      0|    555|     69|
|>Write Metadata Strings             |  2.8431|  0.0000|   1536|      0|      0|      0|    555|     69|
|>Write Metadata User Strings        |  2.8470|  0.0006|   1537|      0|      0|      0|    555|     69|
|>Write Blob Stream                  |  2.8515|  0.0012|   1538|      0|      0|      0|    555|     69|
|>Fixup Metadata                     |  2.8556|  0.0000|   1539|      0|      0|      0|    555|     69|
|>Generated IL and metadata          |  2.8718|  0.0130|   1540|      0|      0|      0|    555|     69|
|>PDB: Defined 31 documents          |  2.8809|  0.0053|   1540|      0|      0|      0|    555|     69|
|>PDB: Sorted 9932 methods           |  2.9174|  0.0312|   1550|      0|      0|      0|    555|     69|
|>PDB: Created                       |  2.9288|  0.0076|   1550|      0|      0|      0|    555|     69|
|>Layout image                       |  2.9344|  0.0015|   1551|      0|      0|      0|    555|     69|
|>Writing Image                      |  2.9382|  0.0003|   1551|      0|      0|      0|    554|     69|
|>Generate PDB Info                  |  2.9422|  0.0005|   1551|      0|      0|      0|    555|     69|
|>Finalize PDB                       |  2.9455|  0.0000|   1551|      0|      0|      0|    555|     69|
|>Signing Image                      |  2.9495|  0.0002|   1551|      0|      0|      0|    554|     69|
|Write .NET Binary                   |  2.9529|  0.5896|   1551|      0|      0|      0|    554|     69|
--------------------------------------------------------------------------------------------------------
```

## Get the mvid

```fsharp
function Get-Mvid($dll) {
    & dotnet fsi "C:\Users\nojaf\Projects\scripts\fsharp\mvid-reader.fsx" $dll
}
```

When working with [reference assemblies](https://learn.microsoft.com/en-us/dotnet/standard/assembly/reference-assemblies), it is useful to inspect the [mvid](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.module.moduleversionid?view=net-7.0) of a binary.

`mvid-reader.fsx`:

```fsharp
#r "nuget: System.Reflection.Metadata"

open System
open System.IO
open System.Reflection.Metadata
open System.Reflection.PortableExecutable

let getMvid refDll =
    use embeddedReader = new PEReader(File.OpenRead refDll)
    let sourceReader = embeddedReader.GetMetadataReader()
    let loc = sourceReader.GetModuleDefinition().Mvid
    let mvid = sourceReader.GetGuid(loc)
    printfn "%s at %s" (mvid.ToString()) (DateTime.Now.ToString())


let dll : string = Array.last fsi.CommandLineArgs


if not (dll.EndsWith(".dll")) then
    failwithf "Expected %s to have .dll extension" dll

if not (File.Exists dll) then
    failwithf "%s does not exist on disk" dll

getMvid dll
```

```powershell
Get-Mvid .\bin\Debug\netstandard2.0\Fantomas.Core.dll
4e838868-adae-c4d5-445f-480b444a96f7 at 2/2/2023 12:00:56 PM
```

## Closing thoughts

Again, all this stuff works for me, it might not be for you.  
I felt like sharing, that's all folks.

Until next time,

Florian

<small>Photo by <a href="https://unsplash.com/@jpprommel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jack Prommel</a> on <a href="https://unsplash.com/photos/kaJiXMCyi20?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small>
  