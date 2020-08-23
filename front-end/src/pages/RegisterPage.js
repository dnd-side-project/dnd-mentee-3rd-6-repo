import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import SignUpContainer from '../containers/auth/SignUpContainer';
import CatProfileImageContainer from '../containers/auth/CatProfileImageContainer';
import ServantInfoContainer from '../containers/auth/ServantInfoContainer';
import ServantInfoAddressFormContainer from '../containers/auth/ServantInfoAddressFormContainer';

const RegisterPage = () => {
  const { page } = useSelector((state) => state.pageNumber);
  return (
    <AuthTemplate
      title={
        page < 3
          ? '회원가입'
          : page === 6
          ? '냥이 정보 등록'
          : page === 7
          ? '집사정보 등록'
          : page === 8
          ? '우리 동네 인증'
          : null
      }
    >
      {page < 4 ? (
        <SignUpContainer />
      ) : page < 7 ? (
        <CatProfileImageContainer />
      ) : page === 7 ? (
        <ServantInfoContainer />
      ) : page === 8 ? (
        <ServantInfoAddressFormContainer />
      ) : null}
    </AuthTemplate>
  );
};

export default RegisterPage;
