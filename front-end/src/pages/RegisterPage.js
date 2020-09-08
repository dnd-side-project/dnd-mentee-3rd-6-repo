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

  const lines = ['88px', '88px', null, null, null, null, '128px', null];
  const highLightTitles = ['우동집에', '집사님이', null, null, null, null, '이웃집사들을', null];
  const titles = [
    '오신걸 환영합니다',
    '누군지 궁금해요!',
    null,
    null,
    null,
    null,
    '만나러 가볼까요?',
    '우리 동네 인증하기',
  ];
  const subTitles = [
    '고양이 좋아하는 당신은 좋은 사람 ( ˘ ³˘) ♡',
    '우동이는 당신을 더 알고 싶다옹 (ง •̀_•́)ง',
    null,
    null,
    null,
    null,
    '마지막 단계다냥! 아자아자 (ง •̀_•́)ง',
    null,
  ];

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

  return (
    <AuthTemplate
      line={lines[pageIndex - 1]}
      highLightTitle={highLightTitles[pageIndex - 1]}
      title={titles[pageIndex - 1]}
      subTitle={subTitles[pageIndex - 1]}
    >
      {currentStepContent()}
    </AuthTemplate>
  );
};

export default RegisterPage;
