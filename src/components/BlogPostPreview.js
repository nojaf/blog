import React from 'react'
import { Link } from 'gatsby'
import TimeAgo from 'react-timeago/lib/index'

const BlogPostPreview = ({ node }) => {
  const { excerpt, frontmatter } = node
  return [
    <div key="sample" className="sample animated fadeIn">
      <div className="container">
        <div className="title animated fadeInUp">
          <Link to={frontmatter.path}>
            <h1>{frontmatter.title}</h1>
          </Link>
        </div>
        <div className="sidebar text-right meta">
          <div className="published animated fadeInUp">
            <strong>Published</strong>
            <TimeAgo date={frontmatter.date} className={'timeago'} />
          </div>
          <span className="separator animated fadeInUp">//</span>
          <div className="tags animated fadeInUp">
            <strong>Tags</strong>
            {frontmatter.tags.map((t,i) => <Link key={i} to={`/tag/${t}`}>{t}</Link>)}
          </div>
        </div>
      </div>
    </div>,
    <article
      key="article"
      className="excerpt animated fadeIn post tag-f tag-fable tag-vscode"
    >
      <div className="container">
        <p>{excerpt}&hellip;</p>
      </div>
    </article>,
  ]
}

export default BlogPostPreview
