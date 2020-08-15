import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../../common/FormWrapper';
import InputForm from '../../common/InputForm';
import BottomCol from '../../common/BottomCol';
import ErrorMessage from '../../common/ErrorMessage';

const LoginForm = ({
  logInLoading,
  onSubmitLogIn,
  onChangeEmail,
  email,
  onChangePassword,
  password,
  isNotMatch,
}) => {
  return (
    <FormWrapper onFinish={onSubmitLogIn}>
      <div className="input-wrapper">
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
      <div className="input-wrapper">
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
        {!isNotMatch && <ErrorMessage>아이디 혹은 비밀번호를 잘못 입력 하였습니다.</ErrorMessage>}
      </div>
      <BottomCol
        bottomText="로그인"
        buttonType="submit"
        loading={logInLoading}
        buttonText="로그인"
        disabled={!isNotMatch}
      />
    </FormWrapper>
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
