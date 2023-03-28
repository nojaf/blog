import React from 'react'
import {graphql} from 'gatsby'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import Cover from "../components/Cover";

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
                        backgroundPosition={post.frontmatter.backgroundPosition}
                    />
                    <main className="py-5 container">
                        <article dangerouslySetInnerHTML={{__html: post.html}}/>
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
        backgroundPosition
      }
    }
  }
`
