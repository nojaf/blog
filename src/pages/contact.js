import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago/lib/index'
import image from './contact.jpg'
import Cover from '../components/Cover'

const Contact = (props) => {
  return (
    <BodyClassName className="post-template page-template page">
      <Layout location={props.location} title="Contact">
        <SEO
          title="Contact Florian Verdonck at nojaf.com"
          keywords={[`blog`, `blog.nojaf.com`]}
        />
        <Cover image={image} title={'Contact Nojaf'} />
        <main className="py-5 container page">
          <article>
            <h2 id="howtopingme">Reach out, touch faith</h2>
            <h3>Business inquiries</h3>
            <p>
              For all business inquiries and more heartfelt matters I recommend
              you <strong>email</strong> me at:
              <br />
              <a href="mailto:florian@nojaf.com">florian&#64;nojaf.com</a>
            </p>
            <h3>Updates on my work in the open</h3>
            <h4>Twitter</h4>
            <p>
              I am quite the Twitter enthusiast and I frequently tweet about new
              developments.
              <br />
              You can follow{' '}
              <a href="http://twitter.com/verdonckflorian">
                <strong>&#64;verdonckflorian</strong>
              </a>
              .
            </p>
            <h4>GitHub</h4>
            <p>
              The one and only{' '}
              <a href="https://github.com/nojaf">
                <strong>nojaf</strong>
              </a>{' '}
              on <a href="https://github.com/nojaf">Github</a>.
            </p>
            <h4>YouTube</h4>
            <p>
              Discover my{' '}
              <a href="https://www.youtube.com/user/nojaf/videos">
                YouTube channel
              </a>{' '}
              for cinematic entertainment.
            </p>
            <h4>Linkedin</h4>
            <p>
              Visit my <strong>profile</strong> on{' '}
              <a href="https://www.linkedin.com/in/florian-verdonck">
                Linkedin
              </a>
              .
            </p>
          </article>
        </main>
      </Layout>
    </BodyClassName>
  )
}

export default Contact
