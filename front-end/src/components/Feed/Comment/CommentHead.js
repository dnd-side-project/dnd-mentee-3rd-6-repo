import React from 'react';
import PropTypes from 'prop-types';

import { CardTitle, CardContent, CardContentText, CommentHeader } from '../styles';

const CommentHead = ({ content, author, timeDesc }) => {
  return (
    <CommentHeader>
      <CardTitle>
        <dl className="feed-card__title-column">
          <dt>
            <img src={author.profileImg} alt={author.nickName} />
          </dt>
          <dd>{author.nickName}</dd>
        </dl>
        <div className="feed-card__title-column">{author.addressName}</div>
      </CardTitle>
      <CardContent>
        <div className="feed-card__content-column">
          <CardContentText>{content}</CardContentText>
        </div>
        <div className="feed-card__content-column">
          <p>{timeDesc}</p>
        </div>
      </CardContent>
    </CommentHeader>
  );
};

CommentHead.prototype = {
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  timeDesc: PropTypes.string.isRequired,
};

export default CommentHead;
