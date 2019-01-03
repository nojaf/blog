import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'

const Cover = ({ path, title, image, tags, date }) => {
  const url = `https://blog.nojaf.com/${path}`
  const twitterText = `${title} by @verdonckflorian`;

  return (
    <header
      className="animated fadeIn"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container" data-stellar-ratio="0.75">
        <div className="title animated fadeInUp">
          <h1>{title}</h1>
          <div className="share">
            Share this on{' '}
            <a
              id="twitter"
              href={`http://twitter.com/share?text=${twitterText};url=${url}`}
            >
              <i className="fa nojaf-share-icon fa-twitter" />
            </a>
            ,
            <a
              id="facebook"
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            >
              <i className="fa nojaf-share-icon fa-facebook" />
            </a>{' '}
            or{' '}
            <a
              id="google-plus"
              href={`https://plus.google.com/share?url=${url}`}
            >
              <i className="fa nojaf-share-icon fa-google-plus" />
            </a>
            .
          </div>
        </div>
        <div className="sidebar text-right meta">
          <div className="published animated fadeInUp">
            <strong>Published</strong>
            <time
              className="timeago"
              dateTime={date}
            />
          </div>
          <span className="separator animated fadeInUp">//</span>
          <div className="tags animated fadeInUp">
            <strong>Tags</strong>
            {tags.map(t => {
              <a href={`/tag/${t}/`}>{t}</a>
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const tags = post.frontmatter.tags || []
    const tagsClass = tags.reduce((acc, next) => `${acc} tag-${next}`)

    return (
      <BodyClassName className={`post-template ${tagsClass}`}>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <div className="main">
            <Cover
              image={post.frontmatter.cover.publicURL}
              path={post.frontmatter.path}
              title={post.frontmatter.title}
              tags={tags}
              date={post.frontmatter.date}
            />
            <div className="push-article">
              <article className="animated fadeIn post tag-javascript tag-elm tag-fp">
                <div
                  className={'container'}
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </article>
            </div>
          </div>
        </Layout>
      </BodyClassName>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        path
        tags
        cover {
          publicURL
        }
      }
    }
  }
`
