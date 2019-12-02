import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/pagination';
import ProjectList from '../components/projectlist';
import SEO from '../components/seo';
import TaxoNav from '../components/taxo-nav';

export default ({ data, pageContext, location }) => {
  const { nodes: posts, pageInfo } = data.allWordpressPost;
  const { nodes: tags } = data.allWordpressTag;
  const tag = data.wordpressTag;
  return (
    <Layout className="list-page" location={location}>
      <SEO title={tag.name} />
      <TaxoNav items={tags} />
      <ProjectList items={posts} />
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
    allWordpressTag {
      nodes {
        name
        slug
      }
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
