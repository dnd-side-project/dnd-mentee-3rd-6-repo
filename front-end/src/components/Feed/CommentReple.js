import React from 'react';
import PropTypes from 'prop-types';
import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';
import { CommentBlock } from './styles';
import RepleIcon from '../../lib/style/feedIcon/RepleIcon';

const CommentReple = ({ reple, onClickLikeReple, onClickUnlikeReple }) => {
  return (
    <CommentBlock reple>
      <span className="comment-reple">
        <RepleIcon />
      </span>
      <dl>
        <dt>
          <div className="comment-block__img">
            <div>
              <img src={reple.author.profileImg} alt={reple.author.nickName} />
            </div>
            <div>
              <span>{reple.author.nickName}</span>
              <span>{reple.author.addressName}</span>
            </div>
          </div>
          <div className="comment-block__like">
            <button
              type="button"
              onClick={reple.isLike ? onClickUnlikeReple(reple.id) : onClickLikeReple(reple.id)}
            >
              <LIkeIcon like={reple.isLike} />
            </button>
          </div>
        </dt>
        <dd>
          <div>{reple.content}</div>
          <div>
            <span>{reple.timeDesc}</span>
            <span>{`좋아요 ${reple.numberOfLikes}개`}</span>
          </div>
        </dd>
      </dl>
    </CommentBlock>
  );
};

CommentReple.prototype = {
  reple: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    numberOfLikes: PropTypes.number,
    isLike: PropTypes.bool,
    createdDateTime: PropTypes.string,
    timeDesc: PropTypes.string,
    author: PropTypes.object,
  }).isRequired,
  onClickLikeReple: PropTypes.func.isRequired,
  onClickUnlikeReple: PropTypes.func.isRequired,
};

export default CommentReple;
