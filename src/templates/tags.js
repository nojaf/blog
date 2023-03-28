import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import BlogPostPreview from '../components/BlogPostPreview'
import { graphql } from 'gatsby'

const Header = ({ tag, total }) => {
  return (
    <header className="tag-header">
      <div className="container" data-stellar-ratio="0.75">
        <div className="title animated fadeInUp">
          <h1 className="text-capitalize">{tag}</h1>
        </div>
        <div className="sidebar text-right meta">
          <div className="published animated fadeInUp">
            <strong>{total} articles</strong>
          </div>
        </div>
      </div>
    </header>
  )
}

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <BodyClassName className={`tag-template tag-${tag}`}>
      <Layout location={location} title={siteTitle}>
        <SEO title={tag} keywords={[`blog`, `blog.nojaf.com`]} />
        <main className="py-5 container">
          <Header total={totalCount} tag={tag} />
          {posts.map((post, idx) => {
            return <BlogPostPreview key={`preview-${idx}`} {...post} />
          })}
        </main>
      </Layout>
    </BodyClassName>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 560)
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
