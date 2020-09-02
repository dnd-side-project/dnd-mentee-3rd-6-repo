import React from 'react';

import LoginFormContainer from '../containers/auth/LoginFormContainer';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate
      line="200px"
      highLightTitle="우리 동네 집사님들을"
      title="만나러 가볼까요"
      subTitle="얼른 친구들이랑 수다떨러 가요 (๑• ₃ -๑) ♡"
    >
      <LoginFormContainer />
    </AuthTemplate>
  );
};

export default LoginPage;
