import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/SignUp/LoginForm';
import useInput from '../../hooks/useInput';
import { GO_TO, loginRequestAction } from '../../modules/user';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInDone } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 나중에 서버에서 받아오는 데이터
  const isNotMatch = false;

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
      isNotMatch={isNotMatch}
    />
  );
};

export default LoginFormContainer;
