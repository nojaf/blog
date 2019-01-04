import React from 'react'
import { Link, graphql, withPrefix } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import BodyClassName from 'react-body-classname'
import TimeAgo from 'react-timeago/lib/index'

const BlogPostPreview = ({ node }) => {
  const {excerpt, fields, frontmatter} = node;
  console.log(fields, frontmatter)
  return [
    <div key='sample' className="sample animated fadeIn">
      <div className="container">
        <div className="title animated fadeInUp">
          <Link to={frontmatter.path}>
            <h1>{frontmatter.title}</h1>
          </Link>
        </div>
        <div className="sidebar text-right meta">
          <div className="published animated fadeInUp">
            <strong>Published</strong>
            <TimeAgo date={frontmatter.date} className={'timeago'}/>
          </div>
          <span className="separator animated fadeInUp">//</span>
          <div className="tags animated fadeInUp">
            <strong>Tags</strong>
            <a href="/tag/f/">F#</a>
            <a href="/tag/fable/">Fable</a>
            <a href="/tag/react/">React</a>
          </div>
        </div>
      </div>
    </div>,
    <article key='article' className="excerpt animated fadeIn post tag-f tag-fable tag-vscode">
      <div className="container">
        <p>
          {excerpt}&hellip;
        </p>
      </div>
    </article>
  ]
}

// const title = node.frontmatter.title || node.fields.slug
// return (
//   <div key={node.fields.slug}>
//     <h3>
//       <Link
//         style={{ boxShadow: `none` }}
//         to={node.frontmatter.path}
//       >
//         {title}
//       </Link>
//     </h3>
//     <small>{node.frontmatter.date}</small>
//     <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
//   </div>
// )

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges; //.splice(0, 5)

    return (
      <BodyClassName className="home-template">
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Home" keywords={[`blog`, `blog.nojaf.com`]} />
          <div className="main" />
          {posts.map((post, idx) => {
            return <BlogPostPreview key={`preview-${idx}`} {...post}  />
          })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
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
          }
        }
      }
    }
  }
`
