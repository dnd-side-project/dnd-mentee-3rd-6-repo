import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../../../components/Feed/Comment/CommentList';
import { PREV_FEED_PAGE } from '../../../modules/feed';

const CommentListContainer = () => {
  const dispatch = useDispatch();

  const {
    Feeds: { contents },
    feedId,
  } = useSelector((state) => state.feed);
  const {
    userInfo: { accessToken },
  } = useSelector((state) => state.user);

  const { comments } = contents.find((v) => v.id === feedId);

  const onClickLikeComment = useCallback(
    (id) => () => {
      console.log('댓글 좋아요', id);
      // dispatch({
      //   type: LIKE_COMMENT_REQUEST,
      //   data: accessToken,
      // });
    },
    [],
  );

  const onClickUnlikeComment = useCallback(
    (id) => () => {
      console.log('댓글 좋아요 취소', id);
      // dispatch({
      //   type: UNLIKE_COMMENT_REQUEST,
      //   data: accessToken,
      // });
    },
    [],
  );

  const onClickLikeReple = useCallback(
    (id) => () => {
      console.log('대댓글 좋아요', id);
      // dispatch({
      //   type: LIKE_REPLE_REQUEST,
      //   data: accessToken,
      // });
    },
    [],
  );

  const onClickUnlikeReple = useCallback(
    (id) => () => {
      console.log('대댓글 좋아요 취소', id);
      // dispatch({
      //   type: UNLIKE_REPLE_REQUEST,
      //   data: accessToken,
      // });
    },
    [],
  );

  return (
    <CommentList
      comments={comments}
      onClickLikeComment={onClickLikeComment}
      onClickUnlikeComment={onClickUnlikeComment}
      onClickLikeReple={onClickLikeReple}
      onClickUnlikeReple={onClickUnlikeReple}
    />
  );
};

export default CommentListContainer;
