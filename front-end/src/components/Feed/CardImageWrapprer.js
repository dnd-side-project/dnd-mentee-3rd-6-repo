import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { pallete } from '../../lib/style/pallete';

export const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: ${({ value }) => `${value}px`};

  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 12px;

  overflow: hidden;

  .slick-list {
    width: 100vw;
    height: auto;
  }

  .slick-slide {
    width: 100vw;
    height: auto;
  }

  .feed-card__img-index {
    position: absolute;
    top: 18px;
    right: 22px;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 25px;
    width: 38px;
    background: rgba(31, 31, 31, 0.7);
    border-radius: 14px;

    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;

    color: ${pallete.primary[3]};

    z-index: 999;
  }

  & .img-box {
    width: 100vw;
    height: auto;

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: ${({ value }) => `${value}px`};
    }
  }
`;

const CardImageWrapprer = ({ feed }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heightValue = window.innerWidth;

  return (
    <CardImage value={heightValue}>
      <span className="feed-card__img-index">
        {currentSlide + 1}/{feed.images.length}
      </span>
      <Slider
        dots={false}
        infinite={false}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        beforeChange={(current, next) => setCurrentSlide(next)}
      >
        {feed.images.map((image) => (
          <div key={image.id} className="img-box">
            <img
              src={`${
                process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : null
              }${image.url}`}
              alt={image}
            />
          </div>
        ))}
      </Slider>
    </CardImage>
  );
};

CardImageWrapprer.prototype = {
  feed: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default CardImageWrapprer;
