import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentForm from '../../components/Comment/CommentForm';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST, ADD_REPLY_COMMENT_REQUEST, OFF_REPLY } from '../../modules/feed';

const CommentFormContainer = () => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const [user, setUser] = useState('');

  const dispatch = useDispatch();
  const { profileImgUrl, nickName, accessToken } = useSelector((state) => state.user.userInfo);
  const {
    FeedById: { id, comments },
    commentId,
  } = useSelector((state) => state.feed);

  const commentRef = useRef();

  useEffect(() => {
    if (commentId) {
      const {
        author: { nickName: username },
      } = comments?.find((v) => v.id === commentId);
      setUser(username);
    } else {
      setUser('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  useEffect(() => {
    commentRef.current.focus();
  }, [dispatch]);

  useEffect(() => {
    if (commentId) {
      commentRef.current.focus();
    }
  }, [commentId]);

  const onClickCancelReply = useCallback(() => {
    dispatch({
      type: OFF_REPLY,
    });
    setUser('');
  }, [dispatch]);

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
      user={user}
      onFinishComment={onFinishComment}
      profileImgUrl={profileImgUrl}
      nickName={nickName}
      onClickCancelReply={onClickCancelReply}
    />
  );
};

export default CommentFormContainer;
