import React from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';

import CommentReply from './CommentReply';
import { CommentItem, MoreGroup } from '../Feed/styles';
import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';

const CommentItemId = ({
  comment,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickReply,
  onClickLikeReply,
  onClickUnlikeReply,
  moreId,
  onClickMore,
  moreReplyId,
  onClickMoreReply,
  onClickRemoveComment,
  onClickRemoveReply,
  userId,
  replyScrollRef,
  commentHeightId,
}) => {
  return (
    <>
      <CommentItem>
        <dl>
          <dt>
            <div className="comment-block__img">
              <div>
                <img
                  src={`${
                    process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : ''
                  }${comment.author.profileImg}`}
                  alt={comment.author.nickName}
                />
              </div>
              <div>
                <span>{comment.author.nickName}</span>
                <span>{comment.author.addressName}</span>
              </div>
            </div>
            <MoreGroup comment={comment.id} more={moreId}>
              <button type="button" onClick={onClickMore(comment.id)}>
                <MoreOutlined />
              </button>
              {comment.id === moreId && (
                <span className="more-modal">
                  <ul>
                    {userId === comment.author.id ? (
                      <li>
                        <button type="button" onClick={onClickRemoveComment}>
                          댓글 삭제
                        </button>
                      </li>
                    ) : (
                      <li>신고하기</li>
                    )}
                  </ul>
                </span>
              )}
            </MoreGroup>
          </dt>
          <dd>
            <div>
              <span>{comment.content}</span>
              <button
                type="button"
                onClick={
                  comment.isLike ? onClickUnlikeComment(comment.id) : onClickLikeComment(comment.id)
                }
              >
                <LIkeIcon like={comment.isLike} />
              </button>
            </div>
            <div>
              <span>{comment.timeDesc}</span>
              <span>{`좋아요 ${comment.numberOfLikes}개`}</span>
              <span>
                {userId !== comment.author.id && (
                  <button type="button" onClick={onClickReply(comment.id)}>
                    답글 쓰기
                  </button>
                )}
              </span>
            </div>
          </dd>
        </dl>
      </CommentItem>
      {comment.replies.map((reply) => (
        <CommentReply
          key={reply.id}
          reply={reply}
          commentId={comment.id}
          onClickLikeReply={onClickLikeReply}
          onClickUnlikeReply={onClickUnlikeReply}
          moreReplyId={moreReplyId}
          onClickMoreReply={onClickMoreReply}
          onClickRemoveReply={onClickRemoveReply}
          userId={userId}
          replyScrollRef={replyScrollRef}
          commentHeightId={commentHeightId}
        />
      ))}
    </>
  );
};

const CommentList = ({
  comments,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickReply,
  onClickLikeReply,
  onClickUnlikeReply,
  moreId,
  onClickMore,
  moreReplyId,
  onClickMoreReply,
  onClickRemoveComment,
  onClickRemoveReply,
  userId,
  commentScrollRef,
  replyScrollRef,
  commentHeightId,
}) => {
  return (
    <ul ref={commentScrollRef}>
      {comments.map((comment) => (
        <CommentItemId
          key={comment.id}
          comment={comment}
          onClickLikeComment={onClickLikeComment}
          onClickUnlikeComment={onClickUnlikeComment}
          onClickReply={onClickReply}
          onClickLikeReply={onClickLikeReply}
          onClickUnlikeReply={onClickUnlikeReply}
          moreId={moreId}
          onClickMore={onClickMore}
          moreReplyId={moreReplyId}
          onClickMoreReply={onClickMoreReply}
          onClickRemoveComment={onClickRemoveComment}
          onClickRemoveReply={onClickRemoveReply}
          userId={userId}
          replyScrollRef={replyScrollRef}
          commentHeightId={commentHeightId}
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
  onClickReply: PropTypes.func.isRequired,
  onClickLikeReply: PropTypes.func.isRequired,
  onClickUnlikeReply: PropTypes.func.isRequired,
  moreId: PropTypes.number.isRequired,
  onClickMore: PropTypes.func.isRequired,
  moreReplyId: PropTypes.number.isRequired,
  onClickMoreReply: PropTypes.func.isRequired,
  onClickRemoveComment: PropTypes.func.isRequired,
  onClickRemoveReply: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  replyScrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  commentHeightId: PropTypes.number.isRequired,
};

CommentList.prototype = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickLikeComment: PropTypes.func.isRequired,
  onClickUnlikeComment: PropTypes.func.isRequired,
  onClickReply: PropTypes.func.isRequired,
  onClickLikeReply: PropTypes.func.isRequired,
  onClickUnlikeReply: PropTypes.func.isRequired,
  moreId: PropTypes.number.isRequired,
  onClickMore: PropTypes.func.isRequired,
  moreReplyId: PropTypes.number.isRequired,
  onClickMoreReply: PropTypes.func.isRequired,
  onClickRemoveComment: PropTypes.func.isRequired,
  onClickRemoveReply: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  commentScrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  replyScrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  commentHeightId: PropTypes.number.isRequired,
};

export default React.memo(CommentList);
