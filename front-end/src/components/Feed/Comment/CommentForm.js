import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { CommentInput } from '../styles';

const CommentForm = ({ commentText, onChangeCommentText, commentRef, onFinishComment }) => {
  return (
    <Form onFinish={onFinishComment}>
      <CommentInput>
        <span>
          <img
            src="https://image.dongascience.com/Photo/2020/06/353a1307fc8cad69a8aaf6777b2862c1.jpg"
            alt=""
          />
        </span>
        <input
          type="text"
          value={commentText}
          placeholder="댓글을 입력해주세요"
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
  onFinishComment: PropTypes.func.isRequired,
};

export default CommentForm;
