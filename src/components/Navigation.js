import React from 'react'
import { Link } from 'gatsby'
const PageSize = 5

const Navigation = ({ skip, total }) => {
  const pages = Math.ceil(total / PageSize)
  const currentPage = skip / PageSize + 1
  const isNotMaxPage = currentPage !== pages
  const hasNewerPosts = currentPage !== 1

  return (
    <nav className="pagination" role="navigation">
      {hasNewerPosts && (
        <Link
          to={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          className={'newer-posts'}
        >
          <span aria-hidden="true">&larr;</span> Newer Posts
        </Link>
      )}
      <span className="page-number">{`Page ${currentPage} of ${pages}`}</span>
      {isNotMaxPage && (
        <Link to={`/page/${currentPage + 1}`} className={'older-posts'}>
          Older Posts <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </nav>
  )
}

export default Navigation
