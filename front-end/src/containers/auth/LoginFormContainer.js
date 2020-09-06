import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import useInput from '../../hooks/useInput';
import { LOG_IN_REQUEST } from '../../modules/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  useEffect(() => {
    setEmailValid(logInError?.message === 'Email이 존재하지 않습니다.');
    setPasswordValid(logInError?.message === 'Password가 틀렸습니다.');
  }, [logInError]);

  const onSubmitLogIn = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [dispatch, email, password]);

  return (
    <LoginForm
      onSubmitLogIn={onSubmitLogIn}
      email={email}
      password={password}
      emailValid={emailValid}
      passwordValid={passwordValid}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      logInLoading={logInLoading}
      logInError={logInError}
    />
  );
};

export default LoginFormContainer;
