import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../../common/FormWrapper';
import InputForm from '../../common/InputForm';
import BottomCol from '../../common/BottomCol';
import ErrorMessage from '../../common/ErrorMessage';

const EmailPassword = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  passwordCheck,
  onChangePasswordCheck,
  passwordError,
  emailError,
  onClickCheckEmail,
  onSubmitEmailPassword,
}) => {
  return (
    <>
      <FormWrapper onFinish={onSubmitEmailPassword}>
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <br />
          <InputForm type="email" name="email" value={email} onChange={onChangeEmail} required />
          {emailError && <ErrorMessage>이미 가입한 이메일 입니다.</ErrorMessage>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">비밀번호</label>
          <br />
          <InputForm
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            onClick={onClickCheckEmail}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password-check">비밀번호 확인</label>
          <br />
          <InputForm
            addonAfter={password && passwordCheck && !passwordError && <p>일치</p>}
            type="password"
            name="password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            disabled={!password}
            required
          />
        </div>
        <BottomCol
          buttonType="submit"
          buttonText="다음으로"
          disabled={!(passwordCheck && !emailError && !passwordError)}
        />
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
  emailError: PropTypes.bool.isRequired,
  checkEmail: PropTypes.func.isRequired,
  onSubmitEmailPassword: PropTypes.func.isRequired,
};

export default React.memo(EmailPassword);
