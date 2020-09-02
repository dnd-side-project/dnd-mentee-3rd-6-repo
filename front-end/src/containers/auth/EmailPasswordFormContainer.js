import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EmailPasswordForm from '../../components/auth/SignUp/EmailPasswordForm';
import useInput from '../../hooks/useInput';
import { EMAIL_VALID_REQUEST, SIGN_UP_2, NEXT_PAGE } from '../../modules/auth';

const EmailPasswordFormContainer = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const [prevEmail, setPrevEmail] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const { EmailValidData } = useSelector((state) => state.auth);

  const emailInputRef = useRef();

  /* 페이지 2 - 이메일 중복확인 */
  useEffect(() => {
    EmailValidData && emailInputRef.current.focus();
    if (email !== prevEmail) {
      EmailValidData && emailInputRef.current.focus();
    }
  }, [EmailValidData, email, prevEmail]);

  /* 페이지 2 - 비밀번호 확인 */
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  /* 페이지 2 - 이메일 중복 확인 */
  const onFocusCheckEmail = useCallback(() => {
    if (prevEmail === email) {
      return null;
    }
    setPrevEmail(() => email);
    return dispatch({
      type: EMAIL_VALID_REQUEST,
      data: email,
    });
  }, [dispatch, email, prevEmail]);

  const onClickReset = useCallback(
    (value) => () => {
      value === 1 && setEmail('');
      value === 2 && setPassword('');
      value === 3 && setPasswordCheck('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  /* 페이지 2 - 패스워드 확인 후 다음 페이지 이동 */
  const onSubmitSignUp = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_2,
      data: {
        email,
        password,
      },
    });
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, email, password, passwordCheck]);

  return (
    <EmailPasswordForm
      email={email}
      onChangeEmail={onChangeEmail}
      password={password}
      onChangePassword={onChangePassword}
      passwordCheck={passwordCheck}
      onChangePasswordCheck={onChangePasswordCheck}
      passwordError={passwordError}
      emailInputRef={emailInputRef}
      EmailValidData={EmailValidData}
      onFocusCheckEmail={onFocusCheckEmail}
      onClickReset={onClickReset}
      onSubmitSignUp={onSubmitSignUp}
    />
  );
};

export default EmailPasswordFormContainer;
