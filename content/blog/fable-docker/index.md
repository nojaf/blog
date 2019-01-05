---
path: '2018/01/20/building-fable-apps-inside-a-docker-container/'
date: '2018-01-20'
title: 'Building Fable apps inside a Docker container'
tags: ['fable','docker', 'fsharp']
cover: './nojaf-fable-docker.jpg'
---

## Introduction

Want to use Docker to develop Fable applications? What if I told you it isn't all that difficult?

> TLDR; How to user Docker with Fable.

## Docker

So the first step with Docker images is that you check whether a suiting image that fits your needs already exists.  
When I checked Docker Hub for any recent images with the Fable tool chain I didn't really find anything that works with _Fable 1.x_.

I accepted the fact that I would have to create the image myself.  
If you check the [docs](http://fable.io/docs/getting-started.html#requirements) for requirements, we'll need:

*   [.NET Core](https://www.microsoft.com/net)
*   [Node js](https://nodejs.org/en/)
*   [Mono](http://www.mono-project.com)

### Docker compose approach

At first I thought that I would need two containers. One with Mono to restore the dependencies with [paket](https://fsprojects.github.io/Paket/) and the other to start the Fable daemon and compile the F# code.

The Mono image exists but I could find one where both .NET Core and Node js were installed.  
I tried to create an image starting from [microsoft/dotnet](https://hub.docker.com/r/microsoft/dotnet/) and add Node to it.  
Well that quickly [backfired](https://github.com/nodejs/docker-node/issues/600) and I tried the other way around: starting from the [Node image](https://github.com/nodejs/docker-node/blob/df8782dfddf8c70663f0a7d19942120b1d6977a5/9/Dockerfile) and installing .NET Core. Victory was mine and I create a [Docker compose file](https://docs.docker.com/compose/) with both containers listed.

To keep our head in the game, let's call the Mono container the **MC** and the .NET/Node container **NNC**.

`docker-compose up`

> Creating two containers linked in a network

Now I was able to create a new Fable app using `dotnet new fable`. (I already installed the templates in the **NNC** image). Next up was using the **MC** to restore the packages. Then you `cd src` into the source folder and hit `dotnet restore`. This will make sure the _fsproj_ finds the dlls stored by paket, I guess. To be completely honest _paket_ is still a mystery to me half the times.

And that was the point where **the docker compose plan hit a wall**. You see `dotnet restore` calls paket, and paket needs _Mono_ to run in the first place. Because paket doesn't yet run on .NET Core.

So the conclusion was that I need one image that contains everything.

### nojaf/Fable

With the previous problems kept in mind it wasn't all that hard to create the image.  
Start from **Node**, add **.NET Core** and finish up by installing **Mono**.  
You can find the image on [Docker Hub](https://hub.docker.com/r/nojaf/fable/) or on [Github](https://github.com/nojaf/fable-docker/blob/master/Dockerfile).

## Building a new app

### New project

Create a new folder first. I'm currently on Windows and using Powershell, the steps are very similar on other operating systems.

```powershell
PS C:\Users\nojaf\Projects> mkdir my-new-fable-app  
PS C:\Users\nojaf\Projects> cd my-new-fable-app
```

Run the Docker image, map port `8080` and add the current folder as a volume.

```powershell
PS C:\Users\nojaf\Projects\my-new-fable-app> $path = "$(pwd)".Replace("C:\","/c/").Replace("\","/");  
PS C:\Users\nojaf\Projects\my-new-fable-app> docker run -it --rm -v "${path}:/usr/src/app" -w "/usr/src/app" -p 8080:8080 nojaf/fable bash
```

Once inside the container you can just create project with `dotnet new fable`.  
The [Fable Simple Template](https://github.com/fable-compiler/fable-templates/tree/master/simple/Content) and the [Elmish template](https://github.com/fable-elmish/templates) are already installed in this image.

```bash
root@7e9435460a64:/usr/src/app# dotnet new fable -lang F#
```

### Restore the packages

At this point you can perfectly follow the steps writing in the Fable docs.

```bash
root@7e9435460a64:/usr/src/app# mono .paket/paket.exe install  
root@7e9435460a64:/usr/src/app# npm i  
root@7e9435460a64:/usr/src/app# cd src  
root@7e9435460a64:/usr/src/app/src# dotnet restore
```

If you want to use [yarn](https://yarnpkg.com/en/) instead of npm that's fine, it is also included in the image.

### Running the app

All we need to do is start the Fable daemon to compile the code. Although this will work, we will need some tweaking to the _webpack_ config.

    root@7e9435460a64:/usr/src/app/src# dotnet fable npm-start  

If you browse to _[http://localhost:8080](http://localhost:8080)_ you wouldn't be able to connect. But why? Didn't we map the ports in Docker when we ran the `run` command? Yeah, we did, but Docker can't figure out how to map _localhost:8080_ to our desktop. It can figure out **[http://0.0.0.0:8080](http://0.0.0.0:8080)** though.

So we'll need to change the webpack config [devServer host setting](https://webpack.js.org/configuration/dev-server/#devserver-host).

```js
...
  devServer: {
    contentBase: resolve('./public'),
    port: 8080,
    host: "0.0.0.0"
  },
...
```

Ow yeah, we now see our Fable app in our browser.

Lastly, we want our browser to reload when we make changes to our source files.  
Because we make the changes outside the container, the file change events aren't picked up inside the container.  
Luckily, we can configure webpack to [poll our files](https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-) to detect changes.

```js
...
  devServer: {
    contentBase: resolve('./public'),
    port: 8080,
    host: "0.0.0.0",
    watchOptions: {
      poll: true
    }
  },
...
```

![Joey approves](http://www.sharegif.com/wp-content/uploads/2013/10/yeah-baby-gif-joey-friends.gif)

And now we've hit the sweet spot. Happy coding ya'all.

## Remarks

*   I often get warnings in the container saying `perl : warning : Setting locale failed.`. If anyone knows how to deal with those I'm all ears.
*   You still need to install F# to get a decent tooling experience, regardless which editor you use.
*   Don't hesitate to make [an issue on Github](https://github.com/nojaf/fable-docker/issues) if you encounter any problems.

## Final words

I hope you enjoyed this blogpost and it all makes sense. If you have any suggestions or questions please leave a comment.

Yours truly,  
nojaf
