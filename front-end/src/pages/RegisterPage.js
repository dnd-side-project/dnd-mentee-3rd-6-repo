import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';
import ProfileImageContainer from '../containers/auth/ProfileImageContainer';
import ServantInfoContainer from '../containers/auth/ServantInfoContainer';
import HometownAuthContainer from '../containers/auth/HometownAuthContainer';

const RegisterPage = () => {
  const { page } = useSelector((state) => state.pageNumber);
  return (
    <AuthTemplate
      title={
        page < 3 ? '회원가입' : page === 7 ? '집사정보 등록' : page === 8 ? '우리 동네 인증' : null
      }
    >
      {page < 4 && <RegisterFormContainer />}
      {page === 4 || (page === 5 && <ProfileImageContainer />)}
      {/* {page === 6 && < />} */}
      {page === 7 && <ServantInfoContainer />}
      {page === 8 && <HometownAuthContainer />}
    </AuthTemplate>
  );
};

export default RegisterPage;
