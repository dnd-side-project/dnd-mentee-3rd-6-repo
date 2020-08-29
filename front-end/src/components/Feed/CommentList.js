import React from 'react';
import PropTypes from 'prop-types';

import { CommentBlock } from './styles';
import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';
import CommentReple from './CommentReple';

const CommentList = ({
  comment,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickLikeReple,
  onClickUnlikeReple,
}) => {
  return (
    <>
      <CommentBlock>
        <dl>
          <dt>
            <div className="comment-block__img">
              <div>
                <img src={comment.author.profileImg} alt={comment.author.nickName} />
              </div>
              <div>
                <span>{comment.author.nickName}</span>
                <span>{comment.author.addressName}</span>
              </div>
            </div>
            <div className="comment-block__like">
              <button
                type="button"
                onClick={
                  comment.isLike ? onClickUnlikeComment(comment.id) : onClickLikeComment(comment.id)
                }
              >
                <LIkeIcon like={comment.isLike} />
              </button>
            </div>
          </dt>
          <dd>
            <div>{comment.content}</div>
            <div>
              <span>{comment.timeDesc}</span>
              <span>{`좋아요 ${comment.numberOfLikes}개`}</span>
              <span>답글 달기</span>
            </div>
          </dd>
        </dl>
      </CommentBlock>
      {comment.replies.map((reple) => (
        <CommentReple
          key={reple.id}
          reple={reple}
          onClickLikeReple={onClickLikeReple}
          onClickUnlikeReple={onClickUnlikeReple}
        />
      ))}
    </>
  );
};

CommentList.prototype = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    numberOfLikes: PropTypes.number,
    isLike: PropTypes.bool,
    numberOfReplies: PropTypes.number,
    createdDateTime: PropTypes.string,
    timeDesc: PropTypes.string,
    author: PropTypes.object,
    replies: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onClickLikeComment: PropTypes.func.isRequired,
  onClickUnlikeComment: PropTypes.func.isRequired,
  onClickLikeReple: PropTypes.func.isRequired,
  onClickUnlikeReple: PropTypes.func.isRequired,
};

export default CommentList;
