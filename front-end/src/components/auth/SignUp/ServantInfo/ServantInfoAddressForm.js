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

const ServantInfoAddressForm = ({ hometown, onSubmitHometownClose }) => {
  return (
    <>
      <Margin top="26px" />
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

ServantInfoAddressForm.prototype = {
  hometown: PropTypes.string.isRequired,
  onSubmitHometownClose: PropTypes.func.isRequired,
  mapRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ServantInfoAddressForm;
