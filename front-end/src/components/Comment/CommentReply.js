import React from 'react';
import PropTypes from 'prop-types';
import { MoreOutlined } from '@ant-design/icons';

import LIkeIcon from '../../lib/style/feedIcon/LIkeIcon';
import { CommentItem, MoreGroup } from '../Feed/styles';
import RepleIcon from '../../lib/style/feedIcon/RepleIcon';

const CommentReply = ({
  reply,
  commentId,
  onClickLikeReply,
  onClickUnlikeReply,
  moreReplyId,
  onClickMoreReply,
  onClickRemoveReply,
  userId,
  replyScrollRef,
  commentHeightId,
}) => {
  return (
    <CommentItem reple ref={commentId === commentHeightId ? replyScrollRef : null}>
      <span className="comment-reple">
        <RepleIcon />
      </span>
      <dl>
        <dt>
          <div className="comment-block__img">
            <div>
              <img
                src={`${
                  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : ''
                }${reply.author.profileImg}`}
                alt={reply.author.nickName}
              />
            </div>
            <div>
              <span>{reply.author.nickName}</span>
              <span>{reply.author.addressName}</span>
            </div>
          </div>
          <MoreGroup reply={reply.id} more={moreReplyId}>
            <button type="button" onClick={onClickMoreReply(reply.id)}>
              <MoreOutlined />
            </button>
            {reply.id === moreReplyId && (
              <span className="more-modal">
                <ul>
                  {userId === reply.author.id ? (
                    <li>
                      <button type="button" onClick={onClickRemoveReply(commentId)}>
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
            <span>{reply.content}</span>
            <button
              type="button"
              onClick={
                reply.isLike
                  ? onClickUnlikeReply(commentId, reply.id)
                  : onClickLikeReply(commentId, reply.id)
              }
            >
              <LIkeIcon like={reply.isLike} />
            </button>
          </div>
          <div>
            <span>{reply.timeDesc}</span>
            <span>{`좋아요 ${reply.numberOfLikes}개`}</span>
          </div>
        </dd>
      </dl>
    </CommentItem>
  );
};

CommentReply.prototype = {
  reply: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    numberOfLikes: PropTypes.number,
    isLike: PropTypes.bool,
    createdDateTime: PropTypes.string,
    timeDesc: PropTypes.string,
    author: PropTypes.object,
  }).isRequired,
  commentId: PropTypes.number.isRequired,
  onClickLikeReply: PropTypes.func.isRequired,
  onClickUnlikeReply: PropTypes.func.isRequired,
  moreReplyId: PropTypes.number.isRequired,
  onClickMoreReply: PropTypes.func.isRequired,
  onClickRemoveReply: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  replyScrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default React.memo(CommentReply);
