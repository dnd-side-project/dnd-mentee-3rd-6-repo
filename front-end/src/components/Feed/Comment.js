import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { CommentInput, CommentSection, CardTitle, CardContent, CardContentText } from './styles';
import CommentList from './CommentList';

const Comment = ({
  comments,
  content,
  author,
  timeDesc,
  commentText,
  onChangeCommentText,
  commentRef,
  onClickLikeComment,
  onClickUnlikeComment,
  onClickLikeReple,
  onClickUnlikeReple,
  onFinishComment,
}) => {
  return (
    <>
      <Form onFinish={onFinishComment}>
        <CommentSection>
          <div>
            <header>
              <CardTitle>
                <dl className="feed-card__title-column">
                  <dt>
                    <img src={author.profileImg} alt={author.nickName} />
                  </dt>
                  <dd>{author.nickName}</dd>
                </dl>
                <div className="feed-card__title-column">{author.addressName}</div>
              </CardTitle>
              <CardContent>
                <div className="feed-card__content-column">
                  <CardContentText>{content}</CardContentText>
                </div>
                <div className="feed-card__content-column">
                  <p>{timeDesc}</p>
                </div>
              </CardContent>
            </header>
            <ul>
              {comments.map((comment) => (
                <CommentList
                  key={comment.id}
                  comment={comment}
                  onClickLikeComment={onClickLikeComment}
                  onClickUnlikeComment={onClickUnlikeComment}
                  onClickLikeReple={onClickLikeReple}
                  onClickUnlikeReple={onClickUnlikeReple}
                />
              ))}
            </ul>
          </div>
        </CommentSection>
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
    </>
  );
};

Comment.prototype = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  timeDesc: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  onChangeCommentText: PropTypes.func.isRequired,
  commentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onFinishComment: PropTypes.func.isRequired,
  onClickLikeComment: PropTypes.func.isRequired,
  onClickUnlikeComment: PropTypes.func.isRequired,
  onClickLikeReple: PropTypes.func.isRequired,
  onClickUnlikeReple: PropTypes.func.isRequired,
};

export default Comment;
