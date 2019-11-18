import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../images/odc-logo.svg';

const Header = ({ meta, menu }) => (
  // const data = useStaticQuery(graphql``);
  <header className="main-header">
    <nav className="container">
      <Link to="/" className="logo">
        <img src={Logo} title={meta.name} alt="odc logo" />
      </Link>
      <ul className="nav fr">
        {menu.items.map(({ title, url }) => {
          return (
            <li key={url}>
              <Link partiallyActive activeClassName="current" title={title} to={url.replace(meta.url, '')}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  </header>
);

export default Header;
