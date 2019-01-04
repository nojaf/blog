import React from 'react'
import BodyClassName from 'react-body-classname'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago/lib/index'
import image from './contact.jpg'

const Contact = props => {
  return (
    <BodyClassName className="post-template page-template page">
      <Layout
        location={props.location}
        title="Contact Florian Verdonck at nojaf.com"
      >
        <SEO
          title="Contact Florian Verdonck at nojaf.com"
          keywords={[`blog`, `blog.nojaf.com`]}
        />
        <div className="main">
          <header
            className="animated fadeIn"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="container" data-stellar-ratio="0.75">
              <div className="title animated fadeInUp">
                <h1>Contact nojaf.com</h1>
                <div className="share">
                  Share this on{' '}
                  <a
                    id="twitter"
                    href="http://twitter.com/share?text=About%20nojaf.com&amp;url=http://blog.nojaf.com/about-nojaf-com/"
                  >
                    <i className="fa nojaf-share-icon fa-twitter" />
                  </a>
                </div>
              </div>
              <div className="sidebar text-right meta">
                <div className="published animated fadeInUp">
                  <strong>Last Updated</strong>
                  <TimeAgo date={'2019-01-04'} className={'timeago'} />
                </div>
              </div>
            </div>
          </header>

          <article className="animated fadeIn post page">
            <div className="container">
              <h2 id="howtopingme">How to ping me?</h2>

              <p>
                The easiest way would be to <strong>email</strong> me at <br />{' '}
                <a href="mailto:florian@nojaf.com">
                  <i className="fa fa-envelope" />&nbsp; florian@nojaf.com
                </a>
              </p>

              <p>
                You can <strong>follow</strong> me on{' '}
                <a href="http://twitter.com/verdonckflorian" target="_blank">
                  <i className="fa fa-twitter" />&nbsp;Twitter
                </a>
                .
              </p>

              <p>
                Check out my <strong>repositories</strong> on{' '}
                <a href="http://github.com/nojaf" target="_blank">
                  <i className="fa fa-github" />&nbsp;Github
                </a>
                .
              </p>
              <p>
                Or visit my <strong>profile</strong> on{' '}
                <a
                  href="https://be.linkedin.com/pub/florian-verdonck/6b/17/38b"
                  target="_blank"
                >
                  <i className="fa fa-linkedin" />&nbsp;Linkedin
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </Layout>
    </BodyClassName>
  )
}

export default Contact
