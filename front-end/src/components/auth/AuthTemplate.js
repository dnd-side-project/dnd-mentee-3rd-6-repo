import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import BackButton from '../common/BackButton';
import { pallete } from '../../lib/style/pallete';

const TopCol = styled(Col)`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    display: flex;
    justify-content: flex-start;
  }

  h1 {
    margin-top: 38px;

    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
  }

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    margin: 15px 0;

    color: ${pallete.orange};
  }
`;

const MiddleCol = styled(Col)`
  label {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
  }
`;

const AuthTemplate = ({ children, title, subtitle }) => {
  return (
    <div>
      <Row gutter={[0, 0]}>
        <TopCol xs={24} md={6}>
          <BackButton />
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthTemplate;
