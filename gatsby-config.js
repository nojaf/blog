module.exports = {
    siteMetadata: {
        title: `blog.nojaf.com`,
        author: `Florian Verdonck`,
        description: `Thoughts, stories and ideas on coding, web &amp; .NET development and other things.`,
        siteUrl: `https://blog.nojaf.com/`,
        social: {
            twitter: `verdonckflorian`,
        },
    },
    plugins: [
        { // this must be loaded first in order to work
            resolve: `gatsby-plugin-google-gtag`, // note this instead of gatsby-plugin-react-helmet
            options: {
                trackingIds: [ "UA-62282942-2", "354193759" ],
                pluginConfig: {
                    head: true,
                    anonymize: false
                }
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
                feeds: [
                    {
                        serialize: ({query: {site, allMarkdownRemark}}) => {
                            return allMarkdownRemark.nodes.map(node => {
                                return Object.assign({}, node.frontmatter, {
                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                                    custom_elements: [{"content:encoded": node.html}],
                                })
                            })
                        },
                        query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
                        output: "/rss.xml",
                        title: "blog.nojaf.com RSS Feed"
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `nojaf's blog`,
                short_name: `blog.nojaf.com`,
                start_url: `/`,
                background_color: `#000`,
                theme_color: `#FFE710`,
                display: `minimal-ui`,
                icon: `static/android-chrome-512x512.png`,
            },
        },
        //`gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`
    ],
}
