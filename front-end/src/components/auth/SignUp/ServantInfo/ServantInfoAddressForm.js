import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';

const MapWrapper = styled.div`
  width: 100vw;
  height: 261px;
  transform: translateX(-16px);
`;

const ServantInfoAddressForm = ({ regionCodeData, currentGPSLoading, onSubmitSignUp }) => {
  return (
    <>
      <Form onFinish={onSubmitSignUp}>
        <Margin top="26px">
          <MapWrapper id="map" />
          {currentGPSLoading && <p>현재 위치 로딩 중</p>}
          {regionCodeData && <h1>현재 위치 : {regionCodeData.addressDepth3}</h1>}
        </Margin>
        <BottomCol buttonType="submit" buttonText="동네 인증 완료하기" disabled={!regionCodeData} />
      </Form>
    </>
  );
};

ServantInfoAddressForm.prototype = {
  regionCodeData: PropTypes.shape({
    addressDepth1: PropTypes.string,
    addressDepth2: PropTypes.string,
    addressDepth3: PropTypes.string,
    addressDepth4: PropTypes.string,
  }).isRequired,
  currentGPSLoading: PropTypes.bool.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(ServantInfoAddressForm);
