import React from 'react';
import { Link } from 'gatsby';

export default ({ items, taxotype = 'tag', toAll }) => {
  items.forEach((x) => {
    x.path = (x.path || `/${taxotype}/${x.slug}`).replace('/category/', '');
  });
  return (
    <nav className="list-filter">
      <ul>
        {toAll ? (
          <li>
            <Link to={toAll.path} activeClassName="active">
              {toAll.name}
            </Link>
          </li>
        ) : null}
        {items.map(({ path, name }) => {
          return (
            <li key={path}>
              <Link to={path} activeClassName="active" partiallyActive>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
