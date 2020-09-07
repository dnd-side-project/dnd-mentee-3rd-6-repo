import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { CommentInput, ReplyBox } from '../Feed/styles';
import CancelIcon from '../../lib/style/button/CancelIcon';
import { pallete } from '../../lib/style/pallete';

const CommentForm = ({
  commentText,
  onChangeCommentText,
  commentRef,
  user,
  onFinishComment,
  profileImgUrl,
  nickName,
  onClickCancelReply,
}) => {
  return (
    <Form onFinish={onFinishComment}>
      {user && (
        <ReplyBox>
          <span>
            <strong>{user}</strong>님에게 답글 남기는 중
          </span>
          <span>
            <button type="button" onClick={onClickCancelReply}>
              <CancelIcon color={pallete.gray[3]} />
            </button>
          </span>
        </ReplyBox>
      )}

      <CommentInput>
        <span>
          <img
            src={`${
              process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BASE_URL : ''
            }${profileImgUrl}`}
            alt={nickName}
          />
        </span>
        <input
          type="text"
          value={commentText}
          placeholder="댓글을 입력해 주세요"
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
  user: PropTypes.string.isRequired,
  onFinishComment: PropTypes.func.isRequired,
  profileImgUrl: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
  onClickCancelReply: PropTypes.func.isRequired,
};

export default CommentForm;
