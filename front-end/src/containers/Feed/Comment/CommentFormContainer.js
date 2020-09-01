import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CommentForm from '../../../components/Feed/Comment/CommentForm';
import useInput from '../../../hooks/useInput';

const CommentFormContainer = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const commentRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    commentRef.current.focus();
  }, [dispatch]);

  const onFinishComment = useCallback(() => {
    console.log(commentText);
    setCommentText('');
    // dispatch({
    //   type: ADD_COMMENT_REQUEST,
    //   data: {
    //     commentText,
    //     reple,
    //   },
    // });
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
