import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../common/InputForm';
import BottomCol from '../../common/BottomCol';
import { ErrorMessage, CleanMessage } from '../../common/Message';
import Margin from '../../common/Margin';

const EmailPasswordForm = ({
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
  nextPage3,
}) => {
  const emailRule = /^[0-9a-zA-Z]([-_.\]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.\]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return (
    <>
      <Form onFinish={nextPage3}>
        <Margin top="105px">
          <InputWrapper>
            <div>
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
                <CleanMessage>올바른 이메일 형식입니다.</CleanMessage>
              ) : (
                <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
              )}
            </div>
          </InputWrapper>
          <InputWrapper>
            <div>
              <label htmlFor="password">비밀번호</label>
              <br />
              <InputForm
                type="password"
                name="password"
                placeholder="* 숫자, 영어, 혹은 특수문자 8자리 이상 (만들 예정)"
                value={password}
                onChange={onChangePassword}
                onFocus={onFocusCheckEmail}
                required
              />
            </div>
          </InputWrapper>
          {password.length >= 8 && (
            <InputWrapper>
              <div>
                <label htmlFor="password-check">비밀번호 확인</label>
                <br />
                <InputForm
                  addonAfter={password && passwordCheck && !passwordError && <p>일치</p>}
                  type="password"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  required
                />
              </div>
            </InputWrapper>
          )}
        </Margin>
        <BottomCol
          buttonType="submit"
          buttonText="다음으로"
          disabled={!(passwordCheck && !emailValidData && !passwordError)}
        />
      </Form>
    </>
  );
};

EmailPasswordForm.prototype = {
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
  nextPage3: PropTypes.func.isRequired,
};

export default React.memo(EmailPasswordForm);
