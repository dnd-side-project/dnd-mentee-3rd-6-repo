import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { InputForm } from '../../common/InputForm';
import BottomCol from '../../common/BottomCol';
import { ErrorMessage, CleanMessage } from '../../common/Message';

const EmailPassword = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  passwordCheck,
  onChangePasswordCheck,
  passwordError,
  emailInputRef,
  emailValidData,
  onFocusCheckEmail,
  onSubmitEmailPassword,
}) => {
  const emailRule = /^[0-9a-zA-Z]([-_.\]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.\]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return (
    <>
      <Form onFinish={onSubmitEmailPassword}>
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <br />
          <InputForm
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={onChangeEmail}
            ref={emailInputRef}
            required
          />
          {emailValidData ? (
            <ErrorMessage>이미 가입한 이메일입니다.</ErrorMessage>
          ) : emailRule.test(email) ? (
            <CleanMessage>올바른 이메일입니다.</CleanMessage>
          ) : (
            <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">비밀번호</label>
          <br />
          <InputForm
            type="password"
            name="password"
            placeholder="* 숫자, 영어, 혹은 특수문자 포함 8자리 이상"
            value={password}
            onChange={onChangePassword}
            onFocus={onFocusCheckEmail}
            required
          />
        </div>
        {password.length >= 8 && (
          <div className="input-wrapper">
            <label htmlFor="password-check">비밀번호 확인</label>
            <br />
            <InputForm
              addonAfter={password && passwordCheck && !passwordError && <p>일치</p>}
              type="password"
              name="password-check"
              placeholder="* 숫자, 영어, 혹은 특수문자 포함 8자리 이상"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
            />
          </div>
        )}

        <BottomCol
          buttonType="submit"
          buttonText="다음으로"
          disabled={!(passwordCheck && !emailValidData && !passwordError)}
        />
      </Form>
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
  emailInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  emailNone: PropTypes.bool.isRequired,
  emailValid: PropTypes.bool.isRequired,
  onFocusCheckEmail: PropTypes.func.isRequired,
  onSubmitEmailPassword: PropTypes.func.isRequired,
};

export default React.memo(EmailPassword);
