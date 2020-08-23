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

const ServantInfoAddressForm = ({ onSubmitHometownClose, addressDepth, currentGPSLoading }) => {
  return (
    <>
      <Form onFinish={onSubmitHometownClose}>
        <Margin top="26px">
          <MapWrapper id="map" />
          {currentGPSLoading && <p>현재 위치 로딩 중</p>}
        </Margin>
        <BottomCol buttonType="submit" buttonText="동네 인증 완료하기" disabled={!addressDepth} />
      </Form>
    </>
  );
};

ServantInfoAddressForm.prototype = {
  onSubmitHometownClose: PropTypes.func.isRequired,
  addressDepth: PropTypes.string.isRequired,
  currentGPSLoading: PropTypes.bool.isRequired,
};

export default React.memo(ServantInfoAddressForm);
