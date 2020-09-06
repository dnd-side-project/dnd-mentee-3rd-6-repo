import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';
import { MapModal, InfoMap, Loading } from './styles';

const MapWrapper = styled.div`
  width: 100vw;
  height: 83vh;
  transform: translateX(-16px);
`;

const ServantInfoAddressForm = ({ address, currentGPSLoading, onSubmitSignUp }) => {
  return (
    <>
      <InfoMap />
      <Form onFinish={onSubmitSignUp}>
        <Margin top="26px">
          <MapWrapper id="map" />
          {currentGPSLoading && (
            <Loading>
              <h1>현재 위치 가져오는 중...</h1>
            </Loading>
          )}
        </Margin>
        <MapModal currentGPSLoading={currentGPSLoading}>
          <p>
            <strong>{address}</strong>의 <br />
            동네 소식을 들으러 갈까요 :)
          </p>
          <BottomCol
            top="5vh"
            bottom="5vh"
            buttonType="submit"
            buttonText="동네 인증 완료하기"
            disabled={!address}
          />
        </MapModal>
      </Form>
    </>
  );
};

ServantInfoAddressForm.prototype = {
  address: PropTypes.string.isRequired,
  currentGPSLoading: PropTypes.bool.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(ServantInfoAddressForm);
