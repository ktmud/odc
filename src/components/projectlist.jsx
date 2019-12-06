import React from 'react';
import GalleryItem from './galleryitem';
import Gallery from 'react-photo-gallery';
import { photoList } from '../utils';

export default ({ items, title }) => {
  const settings = {
    photos: photoList(items),
    renderImage({ photo }) {
      return <GalleryItem key={photo.path} {...photo} />;
    },
    margin: 1,
    targetRowHeight: 340,
  };
  return (
    <div className="container-full home-gallery">
      {title ? <h1 dangerouslySetInnerHTML={{ __html: title }} /> : null}
      <Gallery {...settings} />
    </div>
  );
};
