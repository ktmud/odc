import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export const GalleryItemPropType = PropTypes.shape({
  title: PropTypes.string,
  image: PropTypes.object,
  path: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
});

export default ({ width, height, path, title, image, className }) => {
  image = image || {};
  return (
    <div
      className={`gallery-item ${className}`}
      key={path}
      style={{
        width,
        height,
      }}
    >
      <Link key={path} to={path}>
        {image.localFile ? (
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            alt={image.alt_text}
            title={image.title}
          />
        ) : null}
        {title || image.caption ? (
          <div className="meta container">
            <h3>{title}</h3>
            {image.caption ? (
              <div
                className="caption"
                dangerouslySetInnerHTML={{ __html: image.caption }}
              />
            ) : null}
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export const pageQuery = graphql`
  fragment PostImageFields on wordpress__POST {
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
  }
`;
