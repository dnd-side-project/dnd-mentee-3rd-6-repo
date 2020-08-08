import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import BackButton from '../common/BackButton';
import BottomButton from '../common/BottomButton';

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
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

const AuthTemplate = ({
  children,
  subTitle,
  title,
  bottomText,
  buttonType,
}) => {
  return (
    <div>
      <Row gutter={[0, 40]}>
        {/* xs: 모바일, sm: 태블릿, md: 작은 데스크탑  -> n/24라고 생각, 한 Row의 합은 24가 되어야 함 */}
        <TopCol xs={24} md={6}>
          <BackButton />
          <h2>{title}</h2>
          <p>{subTitle}</p>
        </TopCol>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <BottomButton text={bottomText} buttonType={buttonType} />
        </Col>
      </Row>
    </div>
  );
};

export default AuthTemplate;
