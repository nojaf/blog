import React from 'react'

import "./styles/style.sass";
import Footer from './Footer'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { children } = this.props
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
