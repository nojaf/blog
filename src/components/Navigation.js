import React from 'react'
import { Link } from 'gatsby'

const PageSize = 5

const Navigation = ({ skip, total }) => {
  const pages = Math.ceil(total / PageSize)
  const currentPage = skip / PageSize + 1
  const isNotMaxPage = currentPage !== pages
  const hasNewerPosts = currentPage !== 1

  return (
    <nav role="navigation">
      <ul className="pagination justify-content-center">
        {hasNewerPosts && (
          <li className="page-item">
            <Link
              to={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
              className={'page-link'}
            >
              <span aria-hidden="true">&larr;</span> Newer Posts
            </Link>
          </li>
        )}
        <li className="page-item active">
          <span className="page-link">{`Page ${currentPage} of ${pages}`}</span>
        </li>
        {isNotMaxPage && (
          <li className="page-item">
            <Link to={`/page/${currentPage + 1}`} className={'page-link'}>
              Older Posts <span aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
