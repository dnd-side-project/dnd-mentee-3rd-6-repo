import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BackButton from '../common/BackButton';
import { pallete } from '../../lib/style/pallete';
import HighLight from '../common/HighLight';

const TopCol = styled(Col)`
  display: flex;
  flex-direction: column;

  /* margin-top: 16px; */
  margin-top: 60px; /* 상태바 포함 */

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;

    color: ${pallete.primary[1]};

    margin-top: 28px;
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
      <TopCol xs={24}>
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
