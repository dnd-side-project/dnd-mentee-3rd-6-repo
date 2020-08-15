import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../common/FormWrapper';
import InputForm from '../common/InputForm';
import BottomCol from '../common/BottomCol';

const EmailPassword = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  passwordCheck,
  onChangePasswordCheck,
  passwordError,
  onSubmitEmailPassword,
}) => {
  return (
    <>
      <FormWrapper onFinish={onSubmitEmailPassword}>
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <br />
          <InputForm type="email" name="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">비밀번호</label>
          <br />
          <InputForm
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password-check">비밀번호 확인</label>
          <br />
          <InputForm
            type="password"
            name="password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && '비밀번호가 일치하지 않습니다.'}
        </div>
        <BottomCol buttonType="submit" />
      </FormWrapper>
    </>
  );
};

EmailPassword.prototype = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  passwordCheck: PropTypes.string.isRequired,
  onChangePasswordCheck: PropTypes.func.isRequired,
  passwordError: PropTypes.bool.isRequired,
  onSubmitEmailPassword: PropTypes.func.isRequired,
};

export default EmailPassword;
