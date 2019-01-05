import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" />
        <div className="main container">
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <Link to={'/'} target={'_self'}>Go back home</Link> or <a href={`https://www.youtube.com/watch?v=36fHTeUFXJI`} target='_blank'>it&#39;s not coming home...</a>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage
