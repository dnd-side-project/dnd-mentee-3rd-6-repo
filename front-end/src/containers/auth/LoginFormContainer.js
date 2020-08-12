import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import useInput from '../../hooks/useInput';
import { GO_TO, loginRequestAction } from '../../modules/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInDone } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitLogIn = useCallback(() => {
    dispatch(
      loginRequestAction({
        email,
        password,
      }),
    );
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
    />
  );
};

export default LoginFormContainer;
