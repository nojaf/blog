import React from 'react'
import {Link} from 'gatsby'
import TimeAgo from 'react-timeago/lib/index'

const BlogPostPreview = ({node}) => {
    const {excerpt, frontmatter} = node
    return <div className="row blog-post-preview">
        <div className="d-none d-md-block col-md-3 meta">
            <h3>Published</h3>
            <TimeAgo date={frontmatter.date} className={'timeago'}/>
            <h4>Tags</h4>
            <ul className="list-unstyled">
                {frontmatter.tags.map((t, i) => <li key={i}><Link key={i} to={`/tag/${t}`}>{t}</Link></li>)}
            </ul>
        </div>
        <article className="col col-md-9">
            <Link to={`/${frontmatter.path}`}>
                <h2>{frontmatter.title}</h2>
            </Link>
            <p>{excerpt}&hellip;</p>
        </article>
    </div>
}

export default BlogPostPreview
