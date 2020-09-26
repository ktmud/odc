import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext;

  return (
    <nav className="pagination" role="navigation">
      <div className="navbar navbar-menu">
        {previousPagePath && (
          <div className="navbar-item prev">
            <Link to={previousPagePath} rel="prev">
              &laquo; 上一页
            </Link>
          </div>
        )}
        {nextPagePath && (
          <div className="navbar-item next">
            <Link to={nextPagePath} rel="next">
              下一页 &raquo;
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
