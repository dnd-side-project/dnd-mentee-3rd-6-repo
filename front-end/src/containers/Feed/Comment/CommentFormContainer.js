import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../../../components/Feed/Comment/CommentForm';
import useInput from '../../../hooks/useInput';
import { PREV_FEED_PAGE } from '../../../modules/feed';

const CommentFormContainer = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const commentRef = useRef();

  const dispatch = useDispatch();

  /* 댓글 아이콘을 눌러야지만 접근할 수 있게 */
  useEffect(() => {
    // if (prevPageIndex === null) {
    //   dispatch({
    //     type: PREV_FEED_PAGE,
    //     data: titleIndex,
    //   });
    // }
    commentRef.current.focus();
  }, [dispatch]);

  const onFinishComment = useCallback(() => {
    console.log(commentText);
    setCommentText('');
  }, [commentText, setCommentText]);

  return (
    <CommentForm
      commentText={commentText}
      onChangeCommentText={onChangeCommentText}
      commentRef={commentRef}
      onFinishComment={onFinishComment}
    />
  );
};

export default CommentFormContainer;
