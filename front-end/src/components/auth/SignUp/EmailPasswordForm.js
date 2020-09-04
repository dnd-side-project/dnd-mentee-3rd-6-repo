import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../common/InputForm';
import BottomCol from '../../common/BottomCol';
import { ErrorMessage } from '../../common/Message';
import Margin from '../../common/Margin';
import CloseButton from '../../common/CloseButton';
import CheckIcon from '../../../lib/style/CheckIcon';

const EmailPasswordForm = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  passwordCheck,
  onChangePasswordCheck,
  passwordError,
  EmailValidData,
  onBlurEmailVaid,
  claenEmail,
  onClickReset,
  onSubmitSignUp,
}) => {
  return (
    <>
      <Form onFinish={onSubmitSignUp}>
        <Margin top="40px">
          <InputWrapper>
            <div>
              <label htmlFor="email">이메일</label>
              <br />
              <InputForm
                addonAfter={
                  claenEmail ? (
                    EmailValidData ? (
                      <p>
                        <CloseButton index={1} onClickReset={onClickReset} />
                      </p>
                    ) : (
                      <p>
                        <CheckIcon />
                      </p>
                    )
                  ) : (
                    <p>
                      <CloseButton index={1} onClickReset={onClickReset} />
                    </p>
                  )
                }
                addonpx="80px"
                type="email"
                name="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmailVaid}
                borderColor={EmailValidData}
                top="16px"
                required
              />
              {EmailValidData === null ? null : EmailValidData ? (
                <ErrorMessage>이미 가입한 이메일입니다.</ErrorMessage>
              ) : (
                !claenEmail && <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
              )}
            </div>
          </InputWrapper>
          <InputWrapper top="55px">
            <div>
              <label htmlFor="password">비밀번호</label>
              <br />
              <InputForm
                addonAfter={
                  password.length > 7 ? (
                    <p>
                      <CheckIcon />
                    </p>
                  ) : (
                    <p>
                      <CloseButton index={2} onClickReset={onClickReset} />
                    </p>
                  )
                }
                addonpx="80px"
                type="password"
                name="password"
                placeholder="* 숫자, 영어, 혹은 특수문자 8자리 이상"
                value={password}
                onChange={onChangePassword}
                top="16px"
                required
              />
            </div>
          </InputWrapper>
          {password.length >= 8 && (
            <InputWrapper top="45px">
              <div>
                <label htmlFor="password-check">비밀번호 확인</label>
                <br />
                <InputForm
                  addonAfter={
                    password && passwordCheck && !passwordError ? (
                      <p>
                        <CheckIcon />
                      </p>
                    ) : (
                      <p>
                        <CloseButton index={3} onClickReset={onClickReset} />
                      </p>
                    )
                  }
                  addonpx="80px"
                  type="password"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  top="16px"
                  required
                />
              </div>
            </InputWrapper>
          )}
        </Margin>
        <BottomCol
          top="5vh"
          bottom="5vh"
          buttonType="submit"
          buttonText="다음으로"
          disabled={!(email && passwordCheck && !EmailValidData && !passwordError)}
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
  EmailValidData: PropTypes.bool.isRequired,
  onBlurEmailVaid: PropTypes.func.isRequired,
  claenEmail: PropTypes.bool.isRequired,
  onClickReset: PropTypes.func.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(EmailPasswordForm);
