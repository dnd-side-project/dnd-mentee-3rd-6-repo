import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { CommentInput } from '../Feed/styles';

const CommentForm = ({
  commentText,
  onChangeCommentText,
  commentRef,
  commentId,
  onFinishComment,
  profileImgUrl,
  nickName,
}) => {
  return (
    <Form onFinish={onFinishComment}>
      <CommentInput>
        <span>
          <img
            src={`${
              process.env.NODE_ENV === 'development' && process.env.REACT_APP_BASE_URL
            }${profileImgUrl}`}
            alt={nickName}
          />
        </span>
        <input
          type="text"
          value={commentText}
          placeholder={commentId ? `${commentId} 번에 답글 달기` : '댓글을 입력해 주세요'}
          onChange={onChangeCommentText}
          ref={commentRef}
        />
      </CommentInput>
    </Form>
  );
};

CommentForm.prototype = {
  commentText: PropTypes.string.isRequired,
  onChangeCommentText: PropTypes.func.isRequired,
  commentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  commentId: PropTypes.number.isRequired,
  onFinishComment: PropTypes.func.isRequired,
  profileImgUrl: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
};

export default CommentForm;
