import React from 'react';
import { Row, Col } from 'antd';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import BackButton from '../common/BackButton';
import { pallete } from '../../lib/style/pallete';
import HighLight from '../common/HighLight';

const TopCol = styled(Col)`
  display: flex;
  flex-direction: ${({ title }) => (title === '우리 동네 인증하기' ? 'none' : 'column')};

  ${({ title }) =>
    title === '우리 동네 인증하기' &&
    css`
      justify-content: space-between;
      align-items: center;
    `};

  margin-top: 16px;
  /* margin-top: 60px; */

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;

    color: ${pallete.primary[1]};

    margin-top: ${({ title }) => (title === '우리 동네 인증하기' ? '0px' : '28px')};

    ${({ title }) =>
      title === '우리 동네 인증하기' &&
      css`
        line-height: 0px;
        padding-right: 5vw;
      `};
  }

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${pallete.gray[6]};

    margin-top: 12px;
  }
`;

const MiddleCol = styled(Col)`
  min-height: 73vh;

  form {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
    }
  }
`;

const AuthTemplate = ({ children, line, highLightTitle, title, subTitle }) => {
  return (
    <Row gutter={[0, 0]}>
      <TopCol title={title} xs={24}>
        <BackButton page={1} />
        {title && (
          <>
            <h1>
              <HighLight line={line}>
                {highLightTitle} <span className="line" />
              </HighLight>
              <br />
              {title}
            </h1>
            <h2>{subTitle}</h2>
          </>
        )}
        {/* {title === '우리 동네 인증하기' && <span className="block" />} */}
      </TopCol>
      <MiddleCol xs={24}>{children}</MiddleCol>
    </Row>
  );
};

AuthTemplate.prototype = {
  children: PropTypes.element.isRequired,
  line: PropTypes.string.isRequired,
  highLightTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default AuthTemplate;
