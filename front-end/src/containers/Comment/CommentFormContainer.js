import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../../components/Comment/CommentForm';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST, ADD_REPLY_COMMENT_REQUEST } from '../../modules/feed';

const CommentFormContainer = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const dispatch = useDispatch();
  const { profileImgUrl, nickName, accessToken } = useSelector((state) => state.user.userInfo);
  const {
    FeedById: { id },
    commentId,
  } = useSelector((state) => state.feed);

  const commentRef = useRef();

  useEffect(() => {
    commentRef.current.focus();
  }, [dispatch]);

  // const onClickCancelReply = useCallback(() => {}, []);

  const onFinishComment = useCallback(() => {
    setCommentText('');

    if (commentId) {
      return dispatch({
        type: ADD_REPLY_COMMENT_REQUEST,
        data: {
          commentId,
          content: commentText,
          accessToken,
        },
      });
    }

    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        feedId: id,
        accessToken,
      },
    });
  }, [accessToken, commentId, commentText, dispatch, id, setCommentText]);

  return (
    <CommentForm
      commentText={commentText}
      onChangeCommentText={onChangeCommentText}
      commentRef={commentRef}
      commentId={commentId}
      onFinishComment={onFinishComment}
      profileImgUrl={profileImgUrl}
      nickName={nickName}
    />
  );
};

export default CommentFormContainer;
