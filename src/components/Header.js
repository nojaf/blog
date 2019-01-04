import React from 'react'
import logo from '../../content/assets/nojaf_white_web.png'
import { Link } from 'gatsby'

export default () => {
  return (
    <nav className="animated fadeIn navigation">
      <div className="container">
        <Link to={'/'} className="text-right sidebar brand">
          <img src={logo} alt="nojaf.com" />
        </Link>
        <Link className="teal content" to="/about-nojaf-com">
          About
        </Link>
        <Link className="teal content" to="/contact-nojaf-com">
          Contact
        </Link>
      </div>
    </nav>
  )
}
