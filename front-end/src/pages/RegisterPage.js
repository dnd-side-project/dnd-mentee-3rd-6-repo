import React from 'react';

import RegisterFormContainer from '../containers/auth/RegisterFormContainer';
import AuthTemplate from '../components/auth/AuthTemplate';

const RegisterPage = () => {
  return (
    <AuthTemplate title="회원가입" subtitle="우동집에 오신걸 환영한다냥 >_<">
      <RegisterFormContainer />
    </AuthTemplate>
  );
};

export default RegisterPage;
