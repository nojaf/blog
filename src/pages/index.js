import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import BlogPostPreview from '../components/BlogPostPreview'
import Navigation from '../components/Navigation'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <BodyClassName className="home-template">
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Home" keywords={[`blog`, `blog.nojaf.com`]} />
          <main className="py-5 container">
            <h1 className="d-none">Nojaf Blog Homepage</h1>
            {posts.map((post, idx) => {
              return <BlogPostPreview key={`preview-${idx}`} {...post} />
            })}
            <Navigation total={data.pages.totalCount} skip={0} />
          </main>
        </Layout>
      </BodyClassName>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          excerpt(pruneLength: 560)
          fields {
            slug
          }
          frontmatter {
            date
            title
            path
            tags
          }
        }
      }
    }
    pages: allMarkdownRemark {
      totalCount
    }
  }
`
