import React from 'react';
import styled from 'styled-components';
import { Menu, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const Nav = styled(Menu)`
  position: fixed;
  bottom: 8px;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
`;

const Applayout = ({ children, title }) => {
  return (
    <div>
      <Row
        gutter={8} // 컬럼 사이에 간격 주기(두 컬럼 사이를 8px로 띄움)
      >
        {/* xs: 모바일, sm: 태블릿, md: 작은 데스크탑  -> n/24라고 생각, 한 Row의 합은 24가 되어야 함 */}
        <Col xs={24} md={6}>
          {title}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Nav mode="horizontal">
            <Menu.Item>피드</Menu.Item>
            <Menu.Item>정보</Menu.Item>
            <Menu.Item>사진</Menu.Item>
            <Menu.Item>알림</Menu.Item>
            <Menu.Item>마이</Menu.Item>
          </Nav>
        </Col>
      </Row>
    </div>
  );
};

Applayout.prototype = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Applayout;
