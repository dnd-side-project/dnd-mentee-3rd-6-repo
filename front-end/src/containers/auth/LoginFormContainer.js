import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import useInput from '../../hooks/useInput';
import { loginRequestAction, GO_TO_PHEED } from '../../reducers/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInDone } = useSelector((state) => state.userReducer);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitLogin = useCallback(() => {
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
        type: GO_TO_PHEED,
      });
    }
  }, [dispatch, logInDone]);

  return (
    <LoginForm
      onSubmitLogin={onSubmitLogin}
      email={email}
      password={password}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      logInLoading={logInLoading}
    />
  );
};

export default LoginFormContainer;
