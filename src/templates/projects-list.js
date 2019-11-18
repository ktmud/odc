import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/postlist';
import Pagination from '../components/pagination';

export default ({ data, pageContext }) => {
  const { edges: posts } = data.allWordpressPost;
  return (
    <Layout className="list-page">
      <PostList posts={posts} title="全部项目" />
      <Pagination pageContext={pageContext} pathPrefix="/" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ProjectIndexQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`;
