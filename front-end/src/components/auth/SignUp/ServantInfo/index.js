import React from 'react';
import { Form, Button } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import BottomCol from '../../../common/BottomCol';
import MarginTop from '../../../common/Margin';

const ServantInfoForm = ({
  username,
  nickName,
  onChangeNickName,
  onSearchHometown,
  addressDepth1,
  onSubmitSignUp,
}) => {
  return (
    <>
      <Form onFinish={onSubmitSignUp} encType="multipart/form-data">
        <MarginTop top="105px">
          <InputWrapper>
            <div>
              <label htmlFor="username">이름</label>
              <br />
              <InputForm type="text" name="username" value={username} />
            </div>
          </InputWrapper>
          <InputWrapper>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <br />
              <InputForm
                // addonAfter="0/10"
                type="text"
                name="nickname"
                placeholder="닉네임을 만들어 주세요"
                value={nickName}
                onChange={onChangeNickName}
                required
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <Button onClick={onSearchHometown}>
              지도 보기
              <DownCircleOutlined />
            </Button>
          </InputWrapper>
        </MarginTop>
        <BottomCol
          buttonType="submit"
          //   loading={logInLoading}
          buttonText="정보 등록 완료"
          disabled={!(addressDepth1 && nickName)}
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
  addressDepth1: PropTypes.string.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(ServantInfoForm);
