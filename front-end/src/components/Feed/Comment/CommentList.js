import React from 'react';
import PropTypes from 'prop-types';

import CommentReple from './CommentReple';
import { CommentItem } from '../styles';
import LIkeIcon from '../../../lib/style/feedIcon/LIkeIcon';

const CommentItemId = ({
  comment,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickLikeReple,
  onClickUnlikeReple,
}) => {
  return (
    <>
      <CommentItem>
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
      </CommentItem>
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

const CommentList = ({
  comments,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickLikeReple,
  onClickUnlikeReple,
}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItemId
          key={comment.id}
          comment={comment}
          onClickLikeComment={onClickLikeComment}
          onClickUnlikeComment={onClickUnlikeComment}
          onClickLikeReple={onClickLikeReple}
          onClickUnlikeReple={onClickUnlikeReple}
        />
      ))}
    </ul>
  );
};

CommentItemId.prototype = {
  children: PropTypes.element.isRequired,
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

CommentList.prototype = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickLikeComment: PropTypes.func.isRequired,
  onClickUnlikeComment: PropTypes.func.isRequired,
  onClickLikeReple: PropTypes.func.isRequired,
  onClickUnlikeReple: PropTypes.func.isRequired,
};

export default CommentList;
