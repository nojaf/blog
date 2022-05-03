import React from 'react'

import "./styles/style.sass";
import Footer from './Footer'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return <>
        <Header />
        {children}
        <Footer />
      </>
  }
}

export default Layout
