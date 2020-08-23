/* global kakao */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { NEXT_PAGE } from '../../modules/pageNumber';
import { SIGN_UP_REQUEST } from '../../modules/user';
import ServantInfoForm from '../../components/auth/SignUp/ServantInfo/index';

const ServantInfoContainer = () => {
  const [nickName, onChangeNickName] = useInput('');

  const { userInfoAPIPostData } = useSelector((state) => state.user);
  const {
    phoneNumber,
    name,
    email,
    password,
    isServant,
    addressDepth1,
    addressDepth2,
    addressDepth3,
    addressDepth4,
    catName,
    catFeatures,
    catKindId,
    catGender,
    catBirthday,
    catNeutralized,
    catProfileImg,
  } = userInfoAPIPostData;

  const dispatch = useDispatch();

  /* 페이지 7 - 현재 위치 찾기 버튼 */
  const onSearchHometown = useCallback(() => {
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch]);

  /* 페이지 7 - 회원가입 마무리 단계 버튼 */
  const onSubmitSignUp = useCallback(async () => {
    const formData = new FormData();
    await formData.append('phoneNumber', phoneNumber);
    await formData.append('name', name);
    await formData.append('email', email);
    await formData.append('password', password);
    await formData.append('isServant', isServant);
    await formData.append('nickName', nickName);
    await formData.append('addressDepth1', addressDepth1);
    await formData.append('addressDepth2', addressDepth2);
    await formData.append('addressDepth3', addressDepth3);
    await formData.append('addressDepth4', addressDepth4);
    await formData.append('catName', catName);
    await formData.append('catFeatures', catFeatures);
    await formData.append('catKindId', catKindId);
    await formData.append('catGender', catGender);
    await formData.append('catBirthday', catBirthday);
    await formData.append('catNeutralized', catNeutralized);
    await formData.append('catProfileImg', catProfileImg);
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: formData,
    });
  }, [
    addressDepth1,
    addressDepth2,
    addressDepth3,
    addressDepth4,
    catBirthday,
    catFeatures,
    catGender,
    catKindId,
    catName,
    catNeutralized,
    catProfileImg,
    dispatch,
    email,
    isServant,
    name,
    nickName,
    password,
    phoneNumber,
  ]);

  return (
    <>
      <ServantInfoForm
        username={name}
        nickName={nickName}
        onChangeNickName={onChangeNickName}
        onSearchHometown={onSearchHometown}
        onSubmitSignUp={onSubmitSignUp}
        addressDepth1={addressDepth1}
      />
    </>
  );
};

export default ServantInfoContainer;
