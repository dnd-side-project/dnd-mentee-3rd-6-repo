import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import useInput from '../../hooks/useInput';
import { LOG_IN_REQUEST } from '../../modules/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

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
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      logInLoading={logInLoading}
      logInError={logInError}
    />
  );
};

export default LoginFormContainer;
