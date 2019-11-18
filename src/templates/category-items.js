import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/postList';
import Pagination from '../components/pagination';

export default ({ data, pageContext }) => {
  const { nodes: posts } = data.allWordpressPost;
  const category = data.wordpressCategory;
  return (
    <Layout className="list-page">
      <PostList posts={posts} title={`最新${category.name}`} />
      <Pagination pageContext={pageContext} pathPrefix="/" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryPosts($limit: Int!, $skip: Int!, $slug: String!) {
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
        ...PostListFields
      }
    }
  }
`;
