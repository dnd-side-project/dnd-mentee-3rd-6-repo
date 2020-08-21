import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';
import ProfileImageContainner from '../containers/auth/ProfileImageContainner';

const RegisterPage = () => {
  const { page } = useSelector((state) => state.pageNumber);
  return (
    <AuthTemplate
      title={page < 3 ? '회원가입' : page == 6 && '냥이 정보 등록'}
      subtitle={page < 3 && '우동집에 오신걸 환영한다냥 >_<'}
    >
      {page < 4 && <RegisterFormContainer />}
      {page >= 4 && <ProfileImageContainner />}
    </AuthTemplate>
  );
};

export default RegisterPage;
