---
path: '2019/09/01/building-fable-on-travis/'
date: '2019-09-01'
title: 'Building Fable on Travis CI'
tags: ['javascript','fable','fsharp']
cover: './fable-travis-ci.jpg'
---

## Introduction

Hi nojaf from the future, its you from the past. Today you created a build script for compiling Fable projects on Travis CI.
Using a [Docker image you maintain](https://hub.docker.com/r/nojaf/fable/) it is pretty easy to set up a Travis CI process.
This blogpost is meant to capture what you knew then in case you sorta forgot.

## The good part

Once you logged in to [Travis](https://travis-ci.org/), create a project by selecting a repository. Don't worry you log in with your GitHub account and hit the add button.
They know you are you and you get to choose a repository you have on GitHub.

If you did that then create a `.travis.yml` similar to 

```yml
language: minimal

services:
  - docker

sudo: required

before_install:
  - docker pull nojaf/fable:2.3

jobs:
  include:
    - stage: "CI"
      script: docker run -v "${PWD}:/app" -w "/app" nojaf/fable:2.3 bash -c "yarn && yarn postinstall && yarn build"
```


Watch out, yaml is indentation sensitive and one extra space you mess the whole file 🙃. Use http://www.yamllint.com/ in case of doubt.

In the file you just created, you basically download the Docker image, run some `yarn` or `npm run` command in it and compile F# to JavaScript.

The package json contains something like

```json
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack -p",
    "postinstall": "paket restore && paket generate-load-scripts -f netstandard2.0 -t fsx",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d docs"
  },
```

So the whole webpack thing is being triggered there.

## The source

We both know the next time you'll need this you are going to copy this anyway from some previous project.
Check out https://github.com/nojaf/fable-reactstrap to do so.

## Final words

Plato once said no two trees are exactly alike, yet when we use the word tree people know what you mean.
So yeah, think about that next time you can't sleep.
Take care man.


Yours truly,  
nojaf

Photo by <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@augustindem?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Augustin de Montesquiou"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Augustin de Montesquiou</span></a>