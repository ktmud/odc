import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './homegallery.scss';

export default ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 480,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange(oldIndex, newIndex) {
      setCur(newIndex);
    },
  };
  const [cur, setCur] = useState(0);
  const curNode = items[cur];
  const curImage = curNode.acf.feature_image;

  return (
    <div className="home-gallery">
      <div className="meta">
        <div className="container">
          <h2>{curNode.title}</h2>
          {curImage.caption ? (
            <div
              className="caption"
              dangerouslySetInnerHTML={{ __html: curImage.caption }}
            />
          ) : null}
        </div>
      </div>
      <Slider {...settings}>
        {items.map((node) => {
          const image = node.acf.feature_image;
          return (
            <div key={node.path}>
              <Link to={node.path}>
                <Img
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={image.alt_text}
                  title={image.title}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
