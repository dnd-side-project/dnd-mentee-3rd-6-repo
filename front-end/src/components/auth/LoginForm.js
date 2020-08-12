import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../common/FormWrapper';
import InputForm from '../common/InputForm';
import BottomCol from '../common/BottomCol';

const LoginForm = ({
  logInLoading,
  onSubmitLogIn,
  onChangeEmail,
  email,
  onChangePassword,
  password,
}) => {
  return (
    <FormWrapper onFinish={onSubmitLogIn}>
      <div className="input-wrapper">
        <label htmlFor="email">이메일</label>
        <br />
        <InputForm type="email" name="email" onChange={onChangeEmail} value={email} required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">패스워드</label>
        <br />
        <InputForm
          visibilityToggle
          type="password"
          name="password"
          onChange={onChangePassword}
          value={password}
          required
        />
      </div>
      <BottomCol bottomText="로그인" buttonType="submit" loading={logInLoading} />
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
};

export default LoginForm;
