import React from 'react'
import {Link, graphql} from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import TimeAgo from 'react-timeago/lib/index'
import twitterIcon from "../components/images/twitter-nojaf-blog.svg"

const Cover = ({path, title, image, tags, date}) => {
    const url = `https://blog.nojaf.com/${path}`
    const twitterText = `${title} by @verdonckflorian`;

    return (
        <header style={{backgroundImage: `url(${image})`}}>
            <div className="inner"></div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="d-none d-md-block col col-md-3 col-lg-2 meta">
                            <strong>Published</strong>
                            <TimeAgo date={date} className={'timeago'}/>
                            <strong className="pt-2">Tags</strong>
                            <ul className="list-unstyled">
                                {tags.map((t, i) => <li key={i}><Link key={t} to={`/tag/${t}/`}>{t}</Link></li>)}
                            </ul>
                        </div>
                        <div className="col col-md-9 col-lg-10 d-flex align-content-center flex-wrap">
                            <div className="py-5 ms-md-5">
                                <h1>{title}</h1>
                                <a className="share d-flex align-items-center pt-1"
                                   href={`http://twitter.com/share?text=${twitterText};url=${url}`}>
                                    <span>Share this on&nbsp;</span>
                                    <img src={twitterIcon} alt="Twitter icon"/>
                                </a>
                            </div>
                        </div>
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
        const tags = post.frontmatter.tags || []
        const tagsClass = tags.reduce((acc, next) => `${acc} tag-${next}`)

        return (
            <BodyClassName className={`post-template ${tagsClass}`}>
                <Layout location={this.props.location} title={siteTitle}>
                    <SEO title={post.frontmatter.title} description={post.excerpt}/>
                    <Cover
                        image={post.frontmatter.cover.publicURL}
                        path={post.frontmatter.path}
                        title={post.frontmatter.title}
                        tags={tags}
                        date={post.frontmatter.date}
                    />
                    <main className="py-5 container">
                        <article dangerouslySetInnerHTML={{__html: post.html}}/>
                        <hr/>
                        <Bio/>
                    </main>
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
