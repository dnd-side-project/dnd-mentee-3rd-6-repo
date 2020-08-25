import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BackButton from '../common/BackButton';

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

const MiddleCol = styled(Col)`
  min-height: 90vh;

  form {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  label {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
  }
`;

const AuthTemplate = ({ children, title }) => {
  return (
    <Row gutter={[0, 0]}>
      <TopCol xs={24}>
        <BackButton />
        <h1>{title}</h1>
        <span className="opacity-block" />
      </TopCol>
      <MiddleCol xs={24}>{children}</MiddleCol>
    </Row>
  );
};

AuthTemplate.prototype = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthTemplate;
