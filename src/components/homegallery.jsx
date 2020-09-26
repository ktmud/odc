import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Gallery from 'react-photo-gallery';
import GalleryItem, { GalleryItemPropType } from './galleryitem';
import LogoWall from './logowall';
import H1 from './h1';
import { photoList } from '../utils';

Gallery.propTypes.photos = PropTypes.arrayOf(GalleryItemPropType).isRequired;

export default ({ items }) => {
  const photos = photoList(items);
  let slidesPhotos = photos.filter((x) => x.sticky);
  let otherPhotos = photos.filter((x) => !x.sticky);
  if (slidesPhotos.length === 0) {
    slidesPhotos = photos.splice(
      0,
      Math.max(photos.length % 3, photos.length - 6)
    );
    otherPhotos = photos;
  }
  slidesPhotos.forEach((x) => {
    x.width = '';
    x.height = '100%';
  });

  const settings = {
    photos: otherPhotos,
    renderImage({ photo }) {
      // return <pre>{JSON.stringify(item, null, 4)}</pre>;
      return GalleryItem(photo);
    },
    margin: 1,
    targetRowHeight: 340,
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 480,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="home-gallery">
      <Slider className="hero-image" {...sliderSettings}>
        {slidesPhotos.map((photo) => (
          <GalleryItem key={photo.path} {...photo} showCaption />
        ))}
      </Slider>
      <div className="container-full">
        <H1 className="title inline-title" title="最新项目 / RECENT PROJECTS" />
        <Gallery {...settings} />
        <H1 className="title inline-title" title="合作伙伴 / CLIENTS" />
        <LogoWall />
      </div>
    </div>
  );
};
