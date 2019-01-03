import React from 'react'
import { Link } from 'gatsby'

import "./styles/font-awesome.min.css";
import "./styles/nojaf.min.css";
import Footer from './Footer'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    // let header
    //
    // if (location.pathname === rootPath) {
    //   header = (
    //     <h1>
    //       <Link to={`/`}>
    //         {title}
    //       </Link>
    //     </h1>
    //   )
    // } else {
    //   header = (
    //     <h3>
    //       <Link
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h3>
    //   )
    // }
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Layout
