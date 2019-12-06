import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import H1 from './h1';
import { wpFluid } from '../utils';

export const GalleryItemPropType = PropTypes.shape({
  title: PropTypes.string,
  image: PropTypes.object,
  path: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
});

export default ({
  width,
  height,
  path,
  title,
  image,
  className,
  showCaption = false,
}) => {
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
          <Img fluid={wpFluid(image)} alt={image.alt_text} title={image.title} />
        ) : null}
        {title || caption ? (
          <div
            className="meta container-full"
            style={image.localFile ? null : { opacity: 1 }}
          >
            <H1 title={title} />
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
      media_details {
        sizes {
          large {
            source_url
            width
          }
          full {
            source_url
            width
            height
          }
          medium {
            source_url
            width
          }
          medium_large {
            source_url
            width
          }
          post_thumbnail {
            source_url
            width
          }
          wordpress_1536x1536 {
            source_url
            width
          }
        }
      }
      localFile {
        childImageSharp {
          fluid {
            base64
            aspectRatio
          }
        }
      }
    }
  }
`;
