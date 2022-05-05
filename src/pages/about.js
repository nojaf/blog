import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago/lib/index'
import image from './about.jpg'
import Cover from "../components/Cover";

const About = props => {
    return (
        <BodyClassName className="post-template page-template page">
            <Layout location={props.location} title="About blog.nojaf.com">
                <SEO
                    title="About blog.nojaf.com"
                    keywords={[`blog`, `blog.nojaf.com`]}
                />
                <Cover image={image} title={"About Nojaf"} date={"2022-05-07"}/>
                <main className="py-5 container page">
                    <h2 id="florianverdonck">Florian Verdonck</h2>

                    <p>
                        I'm an eccentric <strong>developer</strong> with ambitions and a
                        progressive mindset. I'm into functional programming and have a strong affinity for the web.
                    </p>

                    <h2 id="talesonnojafcom">Tales on nojaf.com</h2>

                    <p>
                        As a <strong>software craftsman</strong> I frequently come
                        across new technologies and interesting things about code.{' '}
                        <br/>
                        And every once in a while, I try to blog about my adventures.
                    </p>

                    <h2>Open-source adventures</h2>

                    <p>
                        Over the years, I've been involved in the <strong>F# community</strong> and I have contributed
                        to numerous projects.
                        In 2018 I became the maintainer of the <a href="https://github.com/fsprojects/fantomas">Fantomas
                        project</a><br/>
                    </p>
                    <p>If you like what I do, you could consider <a
                        href="https://github.com/sponsors/nojaf">sponsoring</a> me to show your support.</p>

                    <h2 id="thingsthatarecoolnow">Things that are cool now ;)</h2>

                    <p>
                        I'd like to give you some links and buzzwords of stuff I'm
                        looking into at the moment:
                    </p>

                    <ul>
                        <li>
                            <a href="https://facebook.github.io/react">React js</a>
                        </li>
                        <li>
                            <a href="http://www.asp.net/vnext">ASP NET Core</a>
                        </li>
                        <li>
                            <a href="https://www.jetbrains.com/rider">Rider</a>
                        </li>
                        <li>
                            <a href="http://fsharp.org">F#</a>
                        </li>
                        <li>
                            <a href="https://github.com/giraffe-fsharp/Giraffe">
                                Giraffe
                            </a>
                        </li>
                        <li>
                            <a href="http://fable.io">Fable</a>
                        </li>
                        <li>
                            <a href="https://fable-elmish.github.io/elmish">Elmish</a>
                        </li>
                        <li>
                            <a href="http://bulma.io">Bulma</a>
                        </li>
                        <li>
                            <a href="http://elm-lang.org">Elm</a>
                        </li>
                    </ul>
                </main>
            </Layout>
        </BodyClassName>
    )
}

export default About
