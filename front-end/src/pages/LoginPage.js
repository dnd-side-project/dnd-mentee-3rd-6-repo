import React from 'react';

import LoginFormContainer from '../containers/auth/LoginFormContainer';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate title="로그인" subTitle="설명글 쓰는 공간">
      <LoginFormContainer />
    </AuthTemplate>
  );
};

export default LoginPage;
