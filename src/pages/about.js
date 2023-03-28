import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago/lib/index'
import image from './about.jpg'
import Cover from '../components/Cover'
import { Link } from 'gatsby'

const About = (props) => {
  return (
    <BodyClassName className="post-template page-template page">
      <Layout location={props.location} title="About blog.nojaf.com">
        <SEO title="About" keywords={[`blog`, `blog.nojaf.com`]} />
        <Cover image={image} title={'About Nojaf'} />
        <main className="py-5 container page">
          <h2 id="nojaf">So what is Nojaf anyway?</h2>
          <p>
            Nojaf currently is two things:
            <ul>
              <li>
                The internet alias of <em>Florian Verdonck</em>.
              </li>
              <li>
                A Belgian company that represents the freelance activities of
                said Florian Verdonck.
              </li>
            </ul>
          </p>
          <h2 id="florianverdonck">Florian Verdonck</h2>

          <p>
            Hey there, a bit about me: I'm an eccentric{' '}
            <strong>developer</strong> with ambitions and a progressive mindset.
            I'm into <strong>functional programming</strong> and have a strong
            affinity for the web. I have a background in <strong>.NET</strong>{' '}
            and I'm passionate about <strong>software tooling</strong>.
          </p>

          <h2 id="freelance">Freelancer you say?</h2>
          <p>
            That is right! These days I sail under my own banner as an{' '}
            <strong>independent</strong> professional software{' '}
            <strong>consultant</strong>.<br />
            I'm most interested in the <em>open-source</em> space, where I truly
            believe I can make a difference for you and your enterprise.
          </p>
          <h2>Open-source endeavours</h2>

          <p>
            Over the years, I've been involved in the{' '}
            <strong>F# community</strong> and I have contributed to numerous
            projects. In 2018 I became the maintainer of the{' '}
            <a href="https://github.com/fsprojects/fantomas">
              Fantomas project
            </a>
            .<br />
            Fantomas really was my jumping point to getting involved in numerous
            projects.
            <br />
            That journey made me explore a lot of the{' '}
            <strong>F# tooling ecosystem</strong>:
            <ul>
              <li>
                <a href="https://github.com/dotnet/fsharp/pulls?q=is%3Apr+author%3Anojaf">
                  The F# compiler
                </a>
              </li>
              <li>
                <a href="https://github.com/fsharp/FsAutoComplete/pulls?q=is%3Apr+author%3Anojaf">
                  FSAutocomplete
                </a>
                , the F# language server
              </li>
              <li>
                <a href="https://github.com/JetBrains/resharper-fsharp/pulls?q=is%3Apr+author%3Anojaf">
                  The F# Rider plugin
                </a>
              </li>
              <li>
                <a href="https://github.com/dotnet/docs/pulls?q=is%3Apr+author%3Anojaf">
                  The .NET documentation
                </a>
                , where the{' '}
                <a href="https://docs.microsoft.com/en-us/dotnet/fsharp/style-guide/formatting">
                  F# style guide
                </a>{' '}
                lives.
              </li>
            </ul>
          </p>
          <p>
            If you like what I do, consider{' '}
            <Link to="/contact">reaching out</Link> to see what I could do
            tailored to your needs.
          </p>
          <h2 id="blognojafcom">Tales on blog.nojaf.com</h2>

          <p>
            As a <strong>software craftsman</strong>, I frequently come across
            new technologies and interesting things about code. <br />
            And every once in a while, I try to blog about my adventures.
          </p>
        </main>
      </Layout>
    </BodyClassName>
  )
}

export default About
