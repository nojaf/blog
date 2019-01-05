import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div className="container">
            <div className="author animated fadeIn clearfix">
              <Image
                fixed={data.avatar.childImageSharp.original}
                alt={author}
              />
              <div className="info">
                <a href="https://twitter.com/verdonckflorian" className="name">
                  Florian Verdonck
                </a>
                <p className="bio">
                  Florian Verdonck is web &amp; .NET developer. He is passionate
                  about clean code and is eager to learn new technologies.
                </p>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        original {
          src
          width
          height
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
