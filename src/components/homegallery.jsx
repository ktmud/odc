import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Gallery from 'react-photo-gallery';
import GalleryItem, { GalleryItemPropType } from './galleryitem';
import './homegallery.scss';

Gallery.propTypes.photos = PropTypes.arrayOf(GalleryItemPropType).isRequired;

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
  // let slidesPhotos = photos.filter((x) => x.sticky);
  // if (slidesPhotos.length === 0) {
  //   slidesPhotos = photos.splice(0, 4);
  // }
  const slidesPhotos = photos.splice(0, 4);
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
    targetRowHeight: 320,
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
        {slidesPhotos.map(photo => <GalleryItem key={photo.path} {...photo} showCaption />)}
      </Slider>
      <Gallery {...settings} />
    </div>
  );
};
