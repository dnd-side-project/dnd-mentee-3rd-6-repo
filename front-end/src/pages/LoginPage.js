import React from 'react';

import LoginFormContainer from '../containers/auth/LoginFormContainer';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate title="로그인">
      <LoginFormContainer />
    </AuthTemplate>
  );
};

export default LoginPage;
