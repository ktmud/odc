import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import HomeGallery from '../components/homegallery';

export default ({ data }) => {
  return (
    <Layout className="homepage">
      <SEO title="odc studios" />
      <HomeGallery items={data.allWordpressPost.nodes} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query FeaturedProjects {
    allWordpressPost(
      filter: { featured_media: { id: { glob: "*" } } }
      sort: { fields: [sticky, date], order: [DESC, DESC] }
      limit: 10
    ) {
      nodes {
        ...PostImageFields
        ...PostListFields
      }
    }
  }
`;
