import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Comment from '../../components/Feed/Comment';
import {
  PREV_FEED_PAGE,
  LIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_REQUEST,
  LIKE_REPLE_REQUEST,
  UNLIKE_REPLE_REQUEST,
} from '../../modules/feed';
import useInput from '../../hooks/useInput';

const CommentContainer = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const commentRef = useRef();

  const dispatch = useDispatch();
  const {
    Feeds: { contents },
    prevPageIndex,
    titleIndex,
    feedId,
  } = useSelector((state) => state.feed);
  const {
    userInfo: { accessToken },
  } = useSelector((state) => state.user);

  const { comments, content, author, timeDesc } = contents.find((v) => v.id === feedId);

  /* 댓글 아이콘을 눌러야지만 접근할 수 있게 */
  useEffect(() => {
    if (prevPageIndex === null) {
      dispatch({
        type: PREV_FEED_PAGE,
        data: titleIndex,
      });
    }
    commentRef.current.focus();
  }, [dispatch, prevPageIndex, titleIndex]);

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

  const onFinishComment = useCallback(() => {
    console.log(commentText);
    setCommentText('');
  }, [commentText, setCommentText]);

  return (
    <Comment
      comments={comments}
      feedId={feedId}
      content={content}
      author={author}
      timeDesc={timeDesc}
      commentText={commentText}
      onChangeCommentText={onChangeCommentText}
      commentRef={commentRef}
      onClickLikeComment={onClickLikeComment}
      onClickUnlikeComment={onClickUnlikeComment}
      onClickLikeReple={onClickLikeReple}
      onClickUnlikeReple={onClickUnlikeReple}
      onFinishComment={onFinishComment}
    />
  );
};

export default CommentContainer;
