import React from 'react'

import './styles/style.sass'
import Header from './Header'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        <Header />
        {children}
      </>
    )
  }
}

export default Layout
