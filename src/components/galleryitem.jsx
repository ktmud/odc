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

export default ({ width, height, path, title, image, className, showCaption = false }) => {
  image = image || {};
  const caption = showCaption && image.caption;

  return (
    <div
      className={`gallery-item ${className || ''}`}
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
        {title || caption ? (
          <div
            className="meta container"
            style={image.localFile ? null : { opacity: 1 }}
          >
            <h3>{title}</h3>
            {caption ? (
              <div
                className="caption"
                dangerouslySetInnerHTML={{ __html: caption }}
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
            jpegProgressive: true
            fit: COVER
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