import { Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../images/odc-logo.svg';
import LogoText from '../images/odc-logo-text.svg';

const Header = ({ meta, menu, location }) => {
  const isCurrent = (url) => {
    return location.pathname.indexOf(url) === 0;
  };
  const data = useStaticQuery(graphql`
    {
      allWordpressCategory(filter: { count: { gt: 0 } }) {
        nodes {
          name
          slug
          path
          count
          parent_element {
            slug
          }
        }
      }
    }
  `);
  return (
    <header className="main-header">
      <nav>
        <Link to="/" className="logo">
          <img className="logo-icon" src={Logo} alt="" />
          <img
            className="logo-text"
            src={LogoText}
            title={meta.name}
            alt={meta.name}
          />
        </Link>
        <ul className="nav fr">
          {menu.items.map(({ title, url }) => {
            url = url.replace(meta.url, '');
            return (
              <li key={url}>
                <Link
                  className={isCurrent(url) ? 'active' : ''}
                  title={title}
                  to={url}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
