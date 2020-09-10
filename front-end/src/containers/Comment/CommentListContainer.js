import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../components/Comment/CommentList';
import {
  LIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_REQUEST,
  LIKE_REPLY_REQUEST,
  UNLIKE_REPLY_REQUEST,
  ON_REPLY,
  REMOVE_COMMENT_REQUEST,
  REMOVE_REPLY_REQUEST,
} from '../../modules/feed';
import { ACCESS_TOKEN } from '../../modules/user';

const CommentListContainer = () => {
  const [moreId, setMoreId] = useState(null);
  const [moreReplyId, setMoreReplyId] = useState(null);

  const dispatch = useDispatch();

  const { id: userId } = useSelector((state) => state.user.userInfo);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const {
    FeedById: { comments, id: feedId },
    getCommentLoading,
  } = useSelector((state) => state.feed);

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

  const onClickMore = useCallback(
    (id) => () => {
      setMoreId(id);
      if (id === moreId) {
        setMoreId(null);
      }
    },
    [moreId],
  );

  const onClickMoreReply = useCallback(
    (id) => () => {
      setMoreReplyId(id);
      if (id === moreReplyId) {
        setMoreReplyId(null);
      }
    },
    [moreReplyId],
  );

  const onClickRemoveComment = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        feedId,
        commentId: moreId,
        accessToken,
      },
    });
  }, [accessToken, dispatch, feedId, moreId]);

  const onClickRemoveReply = useCallback(
    (id) => () => {
      dispatch({
        type: REMOVE_REPLY_REQUEST,
        data: {
          commentId: id,
          replyId: moreReplyId,
          accessToken,
        },
      });
    },
    [accessToken, dispatch, moreReplyId],
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
      moreId={moreId}
      onClickMore={onClickMore}
      moreReplyId={moreReplyId}
      onClickMoreReply={onClickMoreReply}
      onClickRemoveComment={onClickRemoveComment}
      onClickRemoveReply={onClickRemoveReply}
      userId={userId}
    />
  );
};

export default CommentListContainer;
