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

const Layout = (props) => {
  const { children, className, location } = props;
  const data = useStaticQuery(graphql`
    query SiteMetaQuery {
      beianImage: file(base: { eq: "beian.png" }) {
        id
        childImageSharp {
          fixed(height: 20, width: 20) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <div className={className}>
      <Header
        location={location}
        meta={data.wordpressSiteMetadata}
        menu={data.allWordpressMenusMenusItems.nodes[0]}
      />
      <main>{children}</main>
      <Footer
        meta={data.wordpressSiteMetadata}
        beianImage={data.beianImage.childImageSharp.fixed}
      ></Footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
