require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const baseUrl = process.env.WORDPRESS_BASEURL || 'localhost:1880';
const protocol = 'http';

module.exports = {
  siteMetadata: {
    title: `城像设计`,
    description: `深圳市城像设计咨询有限公司`,
    baiduMapAPIKey: process.env.BAIDU_MAP_API_KEY || 'fake',
    siteUrl: 'http://www.odcstudios.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          'http://content.odcstudios.com/index.php?graphql',
        baseUrl,
        protocol,
        searchAndReplaceContentUrls: {
          sourceUrl: 'http://content.odcstudios.com',
          replacementUrl: 'http://wp.odcstudios.com',
        },
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        // plugins: [
        //   {
        //     resolve: `gatsby-wordpress-inline-images`,
        //     options: {
        //       baseUrl,
        //       protocol,
        //     },
        //   },
        // ],
        includedRoutes: [
          '**/taxonomies',
          '**/categories',
          '**/tags',
          '**/posts',
          '**/pages',
          '**/media',
          '**/*/*/menus',
          '**/*/*/menus-locations',
        ],
        concurrentRequests: 5,
        keepMediaSizes: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        limit: 50,
      },
    },
    `gatsby-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `城像设计`,
        short_name: `odcstudios`,
        start_url: `/`,
        background_color: `#FD780F`,
        theme_color: `#FD780F`,
        display: `minimal-ui`,
        icon: `src/images/odc-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        useResolveUrlLoader: {
          options: {
            debug: true,
            sourceMap: true, //default is false
          },
        },
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
  ],
};
