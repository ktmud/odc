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
      filter: { acf: { feature_image: { id: { glob: "*" } } } }
      sort: { fields: [sticky, date], order: [DESC, DESC] }
    ) {
      nodes {
        id
        path
        title
        excerpt
        acf {
          address
          client
          completed_on
          loc
          started_on
          feature_image {
            alt_text
            caption
            source_url
            title
            localFile {
              childImageSharp {
                fluid(jpegQuality: 95, jpegProgressive: true, fit: COVER) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        date
        modified
      }
    }
  }
`;
