import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import BackButton from '../common/BackButton';

const TopCol = styled(Col)`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    margin-top: 37px;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: bold;
  }

  p {
    font-weight: bold;
  }
`;

const MiddleCol = styled(Col)`
  label {
    font-weight: bold;
  }

  input {
    margin-top: 10px;
  }
`;

const AuthTemplate = ({ children, title, subTitle }) => {
  return (
    <div>
      <Row gutter={[0, 40]}>
        <TopCol xs={24} md={6}>
          <BackButton />
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </TopCol>
        <MiddleCol xs={24} md={12}>
          {children}
        </MiddleCol>
      </Row>
    </div>
  );
};

AuthTemplate.prototype = {
  children: PropTypes.element.isRequired,
  BackButton: PropTypes.element.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthTemplate;
