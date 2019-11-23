import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Slider from 'react-slick';
import Gallery from 'react-photo-gallery';

import './homegallery.scss';

const GalleryItemPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});
Gallery.propTypes.photos = PropTypes.arrayOf(GalleryItemPropType).isRequired;

const GalleryItem = ({ width, height, path, title, image }) => {
  return (
    <div
      className="gallery-item"
      key={path}
      style={{
        width,
        height,
      }}
    >
      <Link key={path} to={path}>
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          alt={image.alt_text}
          title={image.title}
        />
        <div className="meta container">
          <h2>{title}</h2>
          {image.caption ? (
            <div
              className="caption"
              dangerouslySetInnerHTML={{ __html: image.caption }}
            />
          ) : null}
        </div>
      </Link>
    </div>
  );
};

export default ({ items }) => {
  const photos = items.map(({ path, title, featured_media: image }) => {
    const {
      presentationWidth: width,
      presentationHeight: height,
    } = image.localFile.childImageSharp.fluid;
    return {
      path,
      title,
      image,
      width,
      height,
    };
  });
  let slidesPhotos = photos.filter((x) => x.sticky);
  if (slidesPhotos.length === 0) {
    slidesPhotos = photos.splice(0, 2);
  }
  slidesPhotos.forEach((x) => {
    x.width = '';
    x.height = '100%';
  });

  const settings = {
    photos,
    renderImage({ photo }) {
      // return <pre>{JSON.stringify(item, null, 4)}</pre>;
      return GalleryItem(photo);
    },
    margin: 0,
    targetRowHeight: 420,
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 480,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <div className="home-gallery">
      <Slider className="hero-image" {...sliderSettings}>
        {slidesPhotos.map(photo => <GalleryItem key={photo.path} {...photo} />)}
      </Slider>
      <Gallery {...settings} />
    </div>
  );
};
