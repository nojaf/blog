const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const PageSize = 5;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.frontmatter.path,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create blog-list pages
    // highlight-start
    const numPages = Math.ceil(posts.length / PageSize)
    Array.from({ length: numPages }).filter((_,n) => n > 0).forEach((_, i) => {
      createPage({
        path: `/page/${i+2}`,
        component: path.resolve("./src/templates/blog-list-template.js"),
        context: {
          limit: PageSize,
          skip: (i + 1) * PageSize,
        },
      })
    })
    // highlight-end
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
