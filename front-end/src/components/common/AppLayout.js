import React from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { pallete } from '../../lib/style/pallete';
import FeedIcon from '../../lib/style/menuIcon/FeedIcon';
import MyPageIcon from '../../lib/style/menuIcon/MyPageIcon';
import NotificationIcon from '../../lib/style/menuIcon/NotificationIcon';
import PostsIcon from '../../lib/style/menuIcon/PostsIcon';
import QnAIcon from '../../lib/style/menuIcon/QnAIcon';
import MessageIcon from '../../lib/style/menuIcon/MessageIcon';

const TopCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;

  margin-top: 10px;

  h1 {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
  }

  span {
    width: 25px;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 83px;

  margin: 0 auto;
  padding: 0;
  padding-top: 13px;

  border-top: 1px solid ${pallete.gray[2]};
`;

const MenuItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 75px;

  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const MenuButton = styled.button`
  min-width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  outline: none;
  border: none;
  background: inherit;
  cursor: pointer;

  transform: translateY(-30px);

  ${({ value, pageURL }) => {
    return value === pageURL
      ? css`
          color: ${pallete.orange};
        `
      : css`
          color: ${pallete.gray[4]};
        `;
  }};
`;

const Applayout = ({ children, title, pageURL, onClickMenu }) => {
  return (
    <div>
      <Row gutter={[0, 0]}>
        <TopCol xs={24}>
          <span className="opacity-block" />
          <h1>{title}</h1>
          <MessageIcon />
        </TopCol>
        <Col xs={24}>{children}</Col>
        <Col xs={24}>
          <Menu>
            <MenuItem>
              <FeedIcon value="feed" pageURL={pageURL} />
              <MenuButton type="button" value="feed" pageURL={pageURL} onClick={onClickMenu}>
                홈
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <QnAIcon value="qna" pageURL={pageURL} />
              <MenuButton type="button" value="qna" pageURL={pageURL} onClick={onClickMenu}>
                질문답변
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <PostsIcon value="posts" pageURL={pageURL} />
              <MenuButton type="button" value="posts" pageURL={pageURL}>
                글작성
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <NotificationIcon value="notification" pageURL={pageURL} />
              <MenuButton
                type="button"
                value="notification"
                pageURL={pageURL}
                onClick={onClickMenu}
              >
                알림
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MyPageIcon value="mypage" pageURL={pageURL} />
              <MenuButton type="button" value="mypage" pageURL={pageURL} onClick={onClickMenu}>
                마이페이지
              </MenuButton>
            </MenuItem>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

Applayout.prototype = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  onClickMenu: PropTypes.func.isRequired,
};

export default Applayout;
