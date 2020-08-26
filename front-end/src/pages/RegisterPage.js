import React from 'react';
import { useSelector } from 'react-redux';

import AuthTemplate from '../components/auth/AuthTemplate';
import IdentifyFormContainer from '../containers/auth/IdentifyFormContainer';
import EmailPasswordFormContainer from '../containers/auth/EmailPasswordFormContainer';
import IsServantContainer from '../containers/auth/IsServantContainer';
import CatProfileImageFormContainer from '../containers/auth/CatProfileImageFormContainer';
import CatProfileNameFormContainer from '../containers/auth/CatProfileNameFormContainer';
import CatProfileEnrollFormContainer from '../containers/auth/CatProfileEnrollFormContainer';
import ServantInfoFormContainer from '../containers/auth/ServantInfoFormContainer';
import ServantInfoAddressFormContainer from '../containers/auth/ServantInfoAddressFormContainer';

const RegisterPage = () => {
  const { pageIndex } = useSelector((state) => state.auth);
  const titles = ['회원가입', '회원가입', null, null, null, null, '집사 정보 등록', null];

  const stepContents = [
    IdentifyFormContainer,
    EmailPasswordFormContainer,
    IsServantContainer,
    CatProfileImageFormContainer,
    CatProfileNameFormContainer,
    CatProfileEnrollFormContainer,
    ServantInfoFormContainer,
    ServantInfoAddressFormContainer,
  ];

  const currentStepContent = () => {
    const ComponentName = stepContents[pageIndex - 1];
    return <ComponentName />;
  };
  return <AuthTemplate title={titles[pageIndex - 1]}>{currentStepContent()}</AuthTemplate>;
};

export default RegisterPage;
