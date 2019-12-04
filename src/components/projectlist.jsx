import React from 'react';
import { Link, graphql } from 'gatsby';
import GalleryItem from './galleryitem';
import Gallery from 'react-photo-gallery';

export default ({ items, title }) => {
  const settings = {
    photos: items.map(({ title, featured_media: image, path }) => {
      const { presentationWidth: width, presentationHeight: height } = image
        ? image.localFile.childImageSharp.fluid
        : {
            presentationWidth: 400,
            presentationHeight: 300,
          };
      return {
        title,
        image,
        path,
        width,
        height,
      };
    }),
    renderImage({ photo }) {
      return <GalleryItem key={photo.path} {...photo} />;
    },
    margin: 2,
    targetRowHeight: 340,
  };
  return (
    <div className="container-full home-gallery">
      {title ? <h1 dangerouslySetInnerHTML={{ __html: title }} /> : null}
      <Gallery {...settings} />
    </div>
  );
};
