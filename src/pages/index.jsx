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
        id
        path
        title
        excerpt
        sticky
        acf {
          address
          client
          completed_on
          loc
          started_on
        }
        featured_media {
          alt_text
          caption
          source_url
          title
          localFile {
            childImageSharp {
              fluid(
                quality: 97
                jpegQuality: 97
                webpQuality: 97
                jpegProgressive: true
                fit: COVER
                maxWidth: 1960
                maxHeight: 1024
              ) {
                ...GatsbyImageSharpFluid_withWebp
                presentationWidth
                presentationHeight
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
