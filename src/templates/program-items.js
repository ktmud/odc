import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/postList';
import Pagination from '../components/pagination';

export default ({ data, pageContext }) => {
  const { nodes: posts, pageInfo } = data.allWordpressPost;
  const tag = data.wordpressTag;
  return (
    <Layout className="list-page">
      <PostList
        posts={posts}
        title={`所有 ${tag.name} 项目 (共 ${pageInfo.itemCount} 项)`}
      />
      <Pagination pageContext={pageContext} pathPrefix="/" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query VenueTypePosts($limit: Int!, $skip: Int!, $slug: String!) {
    wordpressTag(slug: { eq: $slug }) {
      id
      name
    }
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { acf: { venue_type: { elemMatch: { slug: { eq: $slug } } } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...PostListFields
      }
      pageInfo {
        itemCount
      }
    }
  }
`;
