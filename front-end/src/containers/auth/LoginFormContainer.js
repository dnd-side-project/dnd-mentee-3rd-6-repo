import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import useInput from '../../hooks/useInput';
import { GO_TO, LOG_IN_REQUEST } from '../../modules/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInDone, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitLogIn = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [dispatch, email, password]);

  useEffect(() => {
    if (logInDone) {
      dispatch({
        type: GO_TO,
      });
    }
  }, [dispatch, logInDone]);

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
