// eslint-disable-next-line no-unused-vars
/* global kakao */
import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import ServantInfoForm from '../../components/auth/SignUp/ServantInfo/index';
import { SIGN_UP_REQUEST } from '../../modules/user';
import { SIGN_UP_7, NEXT_PAGE, NICKNAME_VALID_REQUEST } from '../../modules/auth';

const ServantInfoFormContainer = () => {
  const {
    phoneNumber,
    name,
    email,
    password,
    isServant,
    nickName,
    addressDepth1,
    addressDepth2,
    addressDepth3,
    addressDepth4,
    catName,
    catFeatures,
    catKindId,
    catWeight,
    catGender,
    catBirthday,
    catNeutralized,
    catProfileImg,
  } = useSelector((state) => state.auth.authInfo);
  const { NickNameValidData } = useSelector((state) => state.auth);

  const [initialNickName, onChangeInitialNickName] = useInput(nickName || '');
  const [prevNickName, setPrevNickName] = useState('');

  const address = `${addressDepth1}`
    ? `${addressDepth1} ${addressDepth2} ${addressDepth3} ${addressDepth4}`
    : '';

  const dispatch = useDispatch();

  const nickNameInputRef = useRef();

  /* 페이지 7 - 현재 위치 찾기 버튼 */
  const onSearchHometown = useCallback(() => {
    dispatch({
      type: SIGN_UP_7,
      data: initialNickName,
    });
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, initialNickName]);

  /* 페이지 7 - 닉네임 중복 확인 */
  const onBlurCheckNickName = useCallback(() => {
    if (prevNickName !== initialNickName) {
      nickNameInputRef.current.focus();

      dispatch({
        type: NICKNAME_VALID_REQUEST,
        data: initialNickName,
      });
    }
    setPrevNickName(prevNickName);
  }, [dispatch, initialNickName, prevNickName]);

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
    if (isServant) {
      await formData.append('catName', catName);
      await formData.append('catFeatures', catFeatures);
      await formData.append('catKindId', catKindId);
      await formData.append('catWeight', catWeight);
      await formData.append('catGender', catGender);
      await formData.append('catBirthday', catBirthday);
      await formData.append('catNeutralized', catNeutralized);
      await formData.append('catProfileImg', catProfileImg);
    }

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
    catWeight,
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
        nickName={initialNickName}
        onChangeNickName={onChangeInitialNickName}
        onSearchHometown={onSearchHometown}
        address={address}
        NickNameValidData={NickNameValidData}
        nickNameInputRef={nickNameInputRef}
        onBlurCheckNickName={onBlurCheckNickName}
        onSubmitSignUp={onSubmitSignUp}
      />
    </>
  );
};

export default ServantInfoFormContainer;
