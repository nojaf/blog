import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import image from './public-speaking-nojaf-com.jpg'
import Cover from "../components/Cover";

const PublicSpeaking = props => {
    return (<BodyClassName className="post-template page-template page">
            <Layout location={props.location} title="Public speaking at blog.nojaf.com">
                <SEO
                    title="Public speaking at blog.nojaf.com"
                    keywords={[`blog`, `blog.nojaf.com`]}
                />
                <Cover
                    image={image}
                    title="Public Speaking"
                />
                <main className="py-5 container page">
                    <article>
                        <div className="container">
                            <h2 id="intro">Straight from the heart</h2>
                            <p>
                                Over the years, I've had the opportunity to participate in various shapes of Public
                                speaking.<br/>
                                From webinars to online and physical conferences, I've seen a fair share and wish to
                                keep track of these wonderful occasions.<br/>
                                Each and every one of them has been about a topic that is dear to me. My goal is to
                                inspire, educate and help projects grow by doing these things.<br/>
                                And the best is yet to come!
                            </p>

                            <h2 id="ndc-olso-2021">Formatting F# code, There and Back Again</h2>
                            <h3>December 2021 at NDC Oslo (Norway)</h3>
                            <p>In recent years code formatters have done wonders in many languages. They can help a
                                language by making it easier for newcomers on the "how should it look like". And
                                overall, they can avoid pointless arguments in teams. In a perfect world, a formatter is
                                available with the first release of the language. For F# this wasn't the case. In recent
                                years the Fantomas project is rising to empty that void. And given the state of the
                                language and ecosystem, it can be a tough climb.</p>
                            <p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/R9Ob5Vp4a9c"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </p>

                            <h2 id="fsharp-exchange-2021">Fantomas V: The One that Will Format the F# Compiler</h2>
                            <h3>October 2021 at F# eXchange (Online)</h3>
                            <p>Showcasing the grand plan for the next major version of Fantomas.</p>
                            <p><a href="https://skillsmatter.com/skillscasts/17236-fantomas-v">Watch on skills
                                matter</a></p>

                            <h2 id="dotnet-summit-2020">Formatting F# source code</h2>
                            <h3>August 2020 at .NET Summit (Online)</h3>
                            <p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/DiRYHD-HiF8"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </p>

                            <h2 id="fsharpconf-2020">Formatting F# source code</h2>
                            <h3>June 2020 at fsharpConf (Online)</h3>
                            <p>This video cannot be embedded but you can <a href="https://youtu.be/ybkYHYKYeNw?t=4481">watch it on YouTube</a>.</p>

                            <h2 id="jetbrains-dotnetdays-2020">Formatting F# Code</h2>
                            <h3>May 2020 at JetBrains .NET Days (Online)</h3>
                            <p>If you format F# code in Rider, a tool called Fantomas will be called to process this.
                                Fantomas is open source and I am one of the maintainers of this project. In this session
                                I explained how Fantomas's high-level works, how I got involved in this project, and how
                                it is wired into the FSharp support for Rider.</p>
                            <p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/9kK57hMDLvU"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </p>

                            <h2 id="youtube">YouTube</h2>
                            <h3>Est. 2020</h3>
                            <p>I also have a <a href="https://www.youtube.com/user/nojaf/videos">YouTube channel</a> where I post some more niche technical content.
                            </p>

                            <h2 id="fable-conf-2019">A Journey into the Compiler and Tooling</h2>
                            <h3>September 2019 at FableConf Antwerp (Belgium)</h3>
                            <p>When I wanted to add the capability of compiling F# scripts to Fable, I had to explore
                                the infrastructure of the compiler as well as its JS clients, like fable-loader and
                                fable-splitter. In this talk we will do this journey together to understand how all the
                                pieces fit together so, maybe in the future, you can contribute a new feature to the
                                compiler too.</p>
                            <p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/KDPfc9SZNL4"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </p>

                            <h2 id="webinar-jetbrains-2019">From F# to JavaScript with Fable</h2>
                            <h3>August 2019 @ Webinar for JetBrains (Online)</h3>
                            <p>
                                Fable is an F# to JavaScript compiler powered by Babel, designed to produce readable and
                                standard code. It has an active community and can be used across the entire JavaScript
                                spectrum
                            </p>
                            <p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/5191ytFmG_A"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </p>
                            
                            <h2 id="techorama-2018">Introduction to Fable</h2>
                            <h3>2018 @ Techorama (Belgium) <small>(Partner Stage)</small></h3>
                            <p>
                                My first taste of giving a talk at conference. In this short lighting talk I've talked
                                about <a href="https://fable.io">Fable</a>, the F# to JavaScript compiler.
                            </p>
                        </div>
                    </article>
                </main>
            </Layout>
        </BodyClassName>)
}

export default PublicSpeaking
