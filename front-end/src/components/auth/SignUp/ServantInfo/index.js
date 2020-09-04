import React from 'react';
import { Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import BottomCol from '../../../common/BottomCol';
import MarginTop from '../../../common/Margin';
import { AddressButton, InfoWrapper } from './styles';
import { ErrorMessage, CleanMessage } from '../../../common/Message';

const ServantInfoForm = ({
  nickName,
  onChangeNickName,
  onSearchHometown,
  address,
  NickNameValidData,
  nickNameInputRef,
  onBlurCheckNickName,
  onSubmitSignUp,
}) => {
  return (
    <>
      <Form onFinish={onSubmitSignUp} encType="multipart/form-data">
        <MarginTop top="50px">
          <InfoWrapper>
            <InputWrapper>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <br />
                <InputForm
                  addonAfter={<p>{nickName.length}/10</p>}
                  flex={0.91}
                  type="text"
                  name="nickname"
                  placeholder="우동집에서 사용할 닉네임을 만들어 주세요"
                  maxLength={10}
                  value={nickName}
                  onChange={onChangeNickName}
                  onBlur={onBlurCheckNickName}
                  ref={nickNameInputRef}
                  bordercolor={NickNameValidData}
                  top="16px"
                  color="true"
                  required
                />
                {NickNameValidData === null ? null : NickNameValidData ? (
                  <ErrorMessage>이미 사용중인 닉네임 입니다 (다 지우고 검사하기)</ErrorMessage>
                ) : (
                  <CleanMessage>사용 가능한 닉네임 입니다</CleanMessage>
                )}
              </div>
            </InputWrapper>
            <InputWrapper top="60px">
              <div>
                <label htmlFor="address">동네인증</label>
                <br />
                <InputForm
                  addonAfter={
                    <p>
                      <AddressButton type="button" onClick={onSearchHometown}>
                        <SearchOutlined />
                      </AddressButton>
                    </p>
                  }
                  flex={0.9}
                  type="text"
                  name="address"
                  placeholder="우리 냥이는 어디서 살고 있나요?"
                  maxLength={10}
                  value={address}
                  top="16px"
                  color="true"
                  readOnly
                  required
                />
              </div>
            </InputWrapper>
          </InfoWrapper>
        </MarginTop>
        <BottomCol
          top="5vh"
          bottom="5vh"
          buttonType="submit"
          buttonText="정보 등록 완료"
          disabled={!(address && nickName && !NickNameValidData)}
        />
      </Form>
    </>
  );
};

ServantInfoForm.prototype = {
  username: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
  onChangeNickName: PropTypes.func.isRequired,
  onChangeHometown: PropTypes.func.isRequired,
  onSearchHometown: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  NickNameValidData: PropTypes.bool.isRequired,
  nickNameInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onBlurCheckNickName: PropTypes.func.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(ServantInfoForm);
