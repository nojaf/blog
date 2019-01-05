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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-62282942-2`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nojaf's blog`,
        short_name: `blog.nojaf.com`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#32995f`,
        display: `minimal-ui`,
        icon: `content/assets/nojaf-icon.png`,
      },
    },
    //`gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ],
}
