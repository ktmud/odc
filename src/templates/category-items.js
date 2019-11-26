import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/postlist';
import Pagination from '../components/pagination';
import ProjectList from '../components/projectlist';

export default ({ data, pageContext }) => {
  const { nodes: posts } = data.allWordpressPost;
  const category = data.wordpressCategory;
  const { nodes: categories } = data.allWordpressCategory;
  return (
    <Layout className="list-page">
      <div className="container">
        <nav className="list-filter">
          <ul>
            {categories.map(({ slug, name, count }) => {
              return (
                <li key={slug}>
                  <Link to={`/${slug}/`} activeClassName="active" partiallyActive>
                    {name} <span className="sep">···</span> {count}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="chrono-list">
          <ProjectList items={posts} title={`最新${category.name}${category.name === '项目' ? '' : '项目'}`} />
          <Pagination pageContext={pageContext} pathPrefix="/" />
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryPosts($limit: Int!, $skip: Int!, $slug: String!) {
    allWordpressCategory(
      filter: { count: { gt: 0 }, parent_element: { slug: { eq: "projects" } } }
    ) {
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
    wordpressCategory(slug: { eq: $slug }) {
      name
      count
    }
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...PostImageFields
        ...PostListFields
      }
    }
  }
`;
