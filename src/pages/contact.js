import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago/lib/index'
import image from './contact.jpg'
import Cover from "../components/Cover";

const Contact = props => {
    return (<BodyClassName className="post-template page-template page">
        <Layout
            location={props.location}
            title="Contact"
        >
            <SEO
                title="Contact Florian Verdonck at nojaf.com"
                keywords={[`blog`, `blog.nojaf.com`]}
            />
            <Cover image={image} title={"Contact Nojaf"} date={"2022-05-07"}/>
            <main className="py-5 container page">
                <article>
                    <h2 id="howtopingme">How to ping me?</h2>

                    <p>
                        The easiest way would be to <strong>email</strong> me at <br/>{' '}
                        <a href="mailto:florian@nojaf.com">
                            <i className="fa fa-envelope"/>&nbsp; florian@nojaf.com
                        </a>
                    </p>

                    <p>
                        You can <strong>follow</strong> me on{' '}
                        <a href="http://twitter.com/verdonckflorian" target="_blank">
                            <i className="fa fa-twitter"/>&nbsp;Twitter
                        </a>
                        .
                    </p>

                    <p>
                        Check out my <strong>repositories</strong> on{' '}
                        <a href="http://github.com/nojaf" target="_blank">
                            <i className="fa fa-github"/>&nbsp;Github
                        </a>
                        .
                    </p>
                    <p>
                        Or visit my <strong>profile</strong> on{' '}
                        <a
                            href="https://be.linkedin.com/pub/florian-verdonck/6b/17/38b"
                            target="_blank"
                        >
                            <i className="fa fa-linkedin"/>&nbsp;Linkedin
                        </a>
                        .
                    </p>
                </article>
            </main>
        </Layout>
    </BodyClassName>)
}

export default Contact
