import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BottomCol from '../../common/BottomCol';
import MarginTop from '../../common/MarginTop';

const MapWrapper = styled.div`
  width: 100vw;
  height: 261px;
  transform: translateX(-16px);
`;

const HometownAuth = ({ hometown, onSubmitHometownClose }) => {
  return (
    <>
      <MarginTop top="26px" />
      <MapWrapper id="map" />
      <Form onFinish={onSubmitHometownClose}>
        {hometown}
        <BottomCol
          buttonType="submit"
          //   loading={logInLoading}
          buttonText="동네 인증 완료하기"
        />
      </Form>
    </>
  );
};

HometownAuth.prototype = {
  hometown: PropTypes.string.isRequired,
  onSubmitHometownClose: PropTypes.func.isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default HometownAuth;
