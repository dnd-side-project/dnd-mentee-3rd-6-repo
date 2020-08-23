import React, { useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import CatProfileImageForm from '../../components/auth/SignUp/CatProfileImage';
import CatProfileNameForm from '../../components/auth/SignUp/CatProfileImage/CatProfileNameForm';
import CatProfileEnrollForm from '../../components/auth/SignUp/CatProfileImage/CatProfileEnrollForm';
import { SIGN_UP_2_REQUEST, SIGN_UP_3_REQUEST } from '../../modules/user';
import { NEXT_PAGE } from '../../modules/pageNumber';

const ProfileImageContainer = () => {
  const [catName, onChangeCatName] = useInput('');
  const [catFeatures, onChangeCatFeatures] = useInput('');

  const [prevImagePath, setPrevImagePath] = useState({
    file: '',
    previewPath: '',
  });

  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.pageNumber);

  const imageInputRef = useRef();

  /* 페이지 4 - 이미지 등록 버튼 */
  const onClickImageUpload = useCallback(() => {
    imageInputRef.current.click();
  }, []);

  /* 페이지 4 - 이미지 등록 */
  const onChangeImage = useCallback((e) => {
    const filePath = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPrevImagePath({
        file: filePath,
        previewPath: reader.result,
      });
    };
    reader.readAsDataURL(filePath);
  }, []);

  /* 페이지 4 - 다음 페이지 이동 */
  const onNextProfilePage = useCallback(() => {
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch]);

  /* 페이지 5 - 냥이 이름 특징 */
  const onSubmitImage = useCallback(() => {
    dispatch({
      type: SIGN_UP_2_REQUEST,
      data: {
        catName,
        catFeatures,
        catProfileImg: prevImagePath.file,
      },
    });
  }, [catFeatures, catName, dispatch, prevImagePath.file]);

  /* 페이지 6 - 냥이 이름 특징 */
  const onSubmitCatFeatures = useCallback(() => {
    dispatch({
      type: SIGN_UP_3_REQUEST,
      data: {
        catKindId: 1,
        catGender: 'FEMALE',
        catBirthday: '2000-01-02',
        catNeutralized: 'TRUE',
      },
    });
  }, [dispatch]);
  return (
    <>
      {page === 4 && (
        <CatProfileImageForm
          imageInputRef={imageInputRef}
          onClickImageUpload={onClickImageUpload}
          onChangeImage={onChangeImage}
          prevImagePath={prevImagePath}
          onNextProfilePage={onNextProfilePage}
        />
      )}
      {page === 5 && (
        <CatProfileNameForm
          catName={catName}
          onChangeCatName={onChangeCatName}
          catFeatures={catFeatures}
          onChangeCatFeatures={onChangeCatFeatures}
          onSubmitImage={onSubmitImage}
          previewPath={prevImagePath.previewPath}
        />
      )}
      {page === 6 && (
        <CatProfileEnrollForm
          catName={catName}
          previewPath={prevImagePath.previewPath}
          onSubmitCatFeatures={onSubmitCatFeatures}
        />
      )}
    </>
  );
};

export default ProfileImageContainer;
