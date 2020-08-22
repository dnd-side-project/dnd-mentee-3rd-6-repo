import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../common/InputForm';
import BottomCol from '../common/BottomCol';
import { ErrorMessage } from '../common/Message';
import Margin from '../common/Margin';

const LoginForm = ({
  logInLoading,
  onSubmitLogIn,
  onChangeEmail,
  email,
  onChangePassword,
  password,
  logInError,
}) => {
  return (
    <>
      <Form onFinish={onSubmitLogIn}>
        <Margin top="75px">
          <InputWrapper>
            <div>
              <label htmlFor="email">이메일</label>
              <br />
              <InputForm
                type="email"
                name="email"
                placeholder="이메일을 입력해 주세요"
                onChange={onChangeEmail}
                value={email}
                required
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <div>
              <label htmlFor="password">패스워드</label>
              <br />
              <InputForm
                type="password"
                name="password"
                placeholder="비밀번호를 입력해 주세요"
                onChange={onChangePassword}
                value={password}
                required
              />
              {logInError ? (
                logInError.message ? (
                  <ErrorMessage>{logInError.message}</ErrorMessage>
                ) : (
                  <ErrorMessage>네트워크 에러</ErrorMessage>
                )
              ) : null}
            </div>
          </InputWrapper>
        </Margin>
        <BottomCol
          buttonType="submit"
          loading={logInLoading}
          buttonText="로그인"
          disabled={!(email && password)}
        />
      </Form>
    </>
  );
};

LoginForm.prototype = {
  logInLoading: PropTypes.bool.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isNotMatch: PropTypes.bool.isRequired,
};

export default LoginForm;
