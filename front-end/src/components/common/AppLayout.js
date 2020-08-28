import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';
import FeedIcon from '../../lib/style/menuIcon/FeedIcon';
import MyPageIcon from '../../lib/style/menuIcon/MyPageIcon';
import NotificationIcon from '../../lib/style/menuIcon/NotificationIcon';
import PostsIcon from '../../lib/style/menuIcon/PostsIcon';
import QnAIcon from '../../lib/style/menuIcon/QnAIcon';
import MessageIcon from '../../lib/style/menuIcon/MessageIcon';
import BackButton from './BackButton';

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
    width: 20px;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-around;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 83px;

  background: ${pallete.white};

  margin: 0 auto;
  padding: 0;
  padding-top: 13px;

  border-top: 1px solid ${pallete.gray[3]};

  z-index: 999;

  li {
    display: flex;
    justify-content: center;

    a {
      display: flex;
      justify-content: center;
      min-width: 50px;
      height: 50px;

      svg {
        width: auto;
        height: 35px;
      }
    }
  }
`;

const Applayout = ({ children, title, location: { pathname } }) => {
  const { pageIndex } = useSelector((state) => state.feed);

  return (
    <div>
      <Row gutter={[0, 0]}>
        <TopCol xs={24}>
          {pageIndex > 3 ? <BackButton page={2} /> : <span />}
          <h1>{title}</h1>
          <MessageIcon />
        </TopCol>
        <Col xs={24}>{children}</Col>
        <Col xs={24}>
          <Menu>
            <li>
              <NavLink to="/feed" activeClassName="selected">
                <FeedIcon pathname={pathname} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/qna" activeClassName="selected">
                <QnAIcon pathname={pathname} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed/posts" activeClassName="selected">
                <PostsIcon />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notification" activeClassName="selected">
                <NotificationIcon pathname={pathname} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage" activeClassName="selected">
                <MyPageIcon pathname={pathname} />
              </NavLink>
            </li>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

Applayout.prototype = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(Applayout);
