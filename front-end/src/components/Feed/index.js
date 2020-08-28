import React from 'react';
import PropTypes from 'prop-types';

import { FeedSlickStyle, Wrapper, CardList } from './styles';
import Feedhead from './Feedhead';
import FeedCard from './FeedCard';

const Feed = ({
  contents,
  titleIndex,
  onClickHometown,
  onClickAll,
  onClickMyFriend,
  currentSlide,
  setCurrentSlide,
  onClickLike,
  onClickUnlike,
  onClickComment,
}) => {
  return (
    <>
      <FeedSlickStyle />
      <Wrapper>
        <div className="feed-list">
          <Feedhead
            titleIndex={titleIndex}
            onClickHometown={onClickHometown}
            onClickAll={onClickAll}
            onClickMyFriend={onClickMyFriend}
          />
          <CardList>
            {contents.map((feed) => (
              <FeedCard
                key={contents.id}
                feed={feed}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                onClickLike={onClickLike}
                onClickUnlike={onClickUnlike}
                onClickComment={onClickComment}
              />
            ))}
          </CardList>
        </div>
      </Wrapper>
    </>
  );
};

Feed.prototype = {
  contents: PropTypes.shape({
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
  titleIndex: PropTypes.number.isRequired,
  onClickHometown: PropTypes.func.isRequired,
  onClickAll: PropTypes.func.isRequired,
  onClickMyFriend: PropTypes.func.isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickUnlike: PropTypes.func.isRequired,
  onClickComment: PropTypes.func.isRequired,
};

export default Feed;
