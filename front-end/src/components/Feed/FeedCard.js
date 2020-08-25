import React from 'react';
import { FeedCardWrapper, FeedCardTitle, FeedCardImage, FeedCardFooter } from './styles';

const FeedCard = () => {
  return (
    <>
      <FeedCardWrapper>
        <FeedCardTitle>
          <div className="feed-card-title__column">
            <span className="feed-card-title-img">
              <img
                src="https://i.pinimg.com/236x/55/8f/9f/558f9f4b364247f9fa5d3442cfb6f089.jpg"
                alt=""
              />
            </span>
            <span>ppby</span>
          </div>
          <span>김해시 부곡동</span>
        </FeedCardTitle>
        <FeedCardImage>
          <img
            src="https://t1.daumcdn.net/liveboard/catlab/df4476dc4598433bb29710242487ed4c.JPG"
            alt=""
          />
          <FeedCardFooter>
            <div className="feed-card-image__column">
              <span>좋아요</span>
              <span>댓글</span>
            </div>
            <div className="feed-card-image__column">저장</div>
          </FeedCardFooter>
        </FeedCardImage>
      </FeedCardWrapper>
    </>
  );
};

export default FeedCard;
