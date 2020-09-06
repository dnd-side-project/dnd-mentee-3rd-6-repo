import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/Comment/CommentList';
import {
  LIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_REQUEST,
  LIKE_REPLY_REQUEST,
  UNLIKE_REPLY_REQUEST,
  ON_REPLY,
} from '../../modules/feed';

const CommentListContainer = () => {
  const dispatch = useDispatch();
  const {
    FeedById: { comments },
    getCommentLoading,
  } = useSelector((state) => state.feed);
  const { accessToken } = useSelector((state) => state.user.userInfo);

  const onClickReply = useCallback(
    (index) => () => {
      dispatch({
        type: ON_REPLY,
        data: index,
      });
    },
    [dispatch],
  );

  const onClickLikeComment = useCallback(
    (id) => () => {
      dispatch({
        type: LIKE_COMMENT_REQUEST,
        data: {
          commentId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  const onClickUnlikeComment = useCallback(
    (id) => () => {
      dispatch({
        type: UNLIKE_COMMENT_REQUEST,
        data: {
          commentId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  const onClickLikeReply = useCallback(
    (commentId, id) => () => {
      dispatch({
        type: LIKE_REPLY_REQUEST,
        data: {
          commentId,
          replyId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  const onClickUnlikeReply = useCallback(
    (commentId, id) => () => {
      dispatch({
        type: UNLIKE_REPLY_REQUEST,
        data: {
          commentId,
          replyId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  if (getCommentLoading) {
    return <h1>로딩 중</h1>;
  }

  return (
    <CommentList
      comments={comments}
      onClickLikeComment={onClickLikeComment}
      onClickUnlikeComment={onClickUnlikeComment}
      onClickReply={onClickReply}
      onClickLikeReply={onClickLikeReply}
      onClickUnlikeReply={onClickUnlikeReply}
    />
  );
};

export default CommentListContainer;
