import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  CardTitle,
  CardImage,
  CardIcon,
  CardContent,
  CardContentText,
  CardItem,
  // FeedCardContentButton,
} from './styles';
import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';
import ComentIcon from '../../lib/style/feedIcon/ComentIcon';
import SaveIcon from '../../lib/style/feedIcon/SaveIcon';
import FeedCardImage from './FeedCardImage';

const FeedCard = ({
  feed,
  currentSlide,
  setCurrentSlide,
  onClickLike,
  onClickUnlike,
  onClickComment,
}) => {
  return (
    <CardItem>
      <CardTitle>
        <dl className="feed-card__title-column">
          <dt>
            <img src={feed.author.profileImg} alt={feed.author.nickName} />
          </dt>
          <dd>{feed.author.nickName}</dd>
        </dl>
        <div className="feed-card__title-column">{feed.author.addressName}</div>
      </CardTitle>
      <CardImage>
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
            <FeedCardImage key={image.id} image={image.url} />
          ))}
        </Slider>
      </CardImage>
      <CardIcon>
        <div className="feed-card__icon-column">
          <div className="icon--item">
            <button type="button" onClick={feed.isLike ? onClickUnlike : onClickLike}>
              {feed.isLike ? <LIkeIcon like /> : <LIkeIcon />}
            </button>
            <span>{feed.numberOfLikes}</span>
          </div>
          <div className="icon--item">
            <button type="button" onClick={onClickComment}>
              <ComentIcon />
            </button>
            <span>{feed.numberOfComments}</span>
          </div>
        </div>
        <div className="feed-card__icon-column">
          <SaveIcon />
        </div>
      </CardIcon>
      <CardContent>
        <div className="feed-card__content-column">
          <CardContentText>{feed.content}</CardContentText>
          {/* <FeedCardContentButton type="button" length={hang.length}>
            더보기
          </FeedCardContentButton> */}
        </div>
        <div className="feed-card__content-column">
          <p>{feed.timeDesc}</p>
        </div>
      </CardContent>
    </CardItem>
  );
};

FeedCard.prototype = {
  feed: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    author: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.object),
    comments: PropTypes.arrayOf(PropTypes.object),
    isLike: PropTypes.bool,
    numberOfLikes: PropTypes.number,
    numberOfComments: PropTypes.number,
    createdDateTime: PropTypes.string,
    timeDesc: PropTypes.string,
  }).isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickUnlike: PropTypes.func.isRequired,
  onClickComment: PropTypes.func.isRequired,
  // onClickShowText: PropTypes.func.isRequired,
};

export default FeedCard;
