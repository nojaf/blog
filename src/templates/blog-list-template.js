import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import BlogPostPreview from '../components/BlogPostPreview'
import Navigation from '../components/Navigation'

export default class BlogList extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <BodyClassName className="paged archive-template">
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title={`Page`} keywords={[`blog`, `blog.nojaf.com`]} />
          <div className="main">
            {posts.map((post, idx) => {
              return <BlogPostPreview key={`preview-${idx}`} {...post} />
            })}
            <Navigation total={this.props.data.allMarkdownRemark.totalCount} skip={this.props.pageContext.skip} />
          </div>
        </Layout>
      </BodyClassName>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
  }
`
