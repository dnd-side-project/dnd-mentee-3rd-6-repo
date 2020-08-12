import React from 'react';

import RegisterFormContainer from '../containers/auth/RegisterFormContainer';
import AuthTemplate from '../components/auth/AuthTemplate';

const RegisterPage = () => {
  return (
    <AuthTemplate title="회원가입" subTitle="인증 절차를 꼼꼼히 하는거에 대한 설명">
      <RegisterFormContainer />
    </AuthTemplate>
  );
};

export default RegisterPage;
