/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import './layout.scss';

const Layout = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteMetaQuery {
      wordpressSiteMetadata {
        id
        description
        home
        name
        url
      }
      allWordpressMenusMenusItems(filter: { name: { eq: "main-nav" } }) {
        nodes {
          items {
            url
            title
          }
        }
      }
    }
  `);

  useEffect(() => {
    const onScroll = (e) => {
      if (window.scrollY > 60) {
        document.body.setAttribute('data-scrolled', 1);
      } else {
        document.body.setAttribute('data-scrolled', 0);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  })

  return (
    <div className={className}>
      <Header
        meta={data.wordpressSiteMetadata}
        menu={data.allWordpressMenusMenusItems.nodes[0]}
      />
      <main>{children}</main>
      <Footer meta={data.wordpressSiteMetadata}></Footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
