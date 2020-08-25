import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CatProfileImageForm from '../../components/auth/SignUp/CatProfileImage';
import { SIGN_UP_4, NEXT_PAGE } from '../../modules/auth';

const CatProfileImageFormContainer = () => {
  const [prevImagePath, setPrevImagePath] = useState({
    file: '',
    previewPath: '',
  });
  const { file, previewPath } = prevImagePath;

  const dispatch = useDispatch();

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
  const onSubmitSignUp = useCallback(() => {
    dispatch({
      type: SIGN_UP_4,
      data: {
        catProfileImg: file,
        previewPath,
      },
    });
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, file, previewPath]);

  return (
    <CatProfileImageForm
      imageInputRef={imageInputRef}
      onClickImageUpload={onClickImageUpload}
      onChangeImage={onChangeImage}
      prevImagePath={prevImagePath}
      onSubmitSignUp={onSubmitSignUp}
    />
  );
};

export default CatProfileImageFormContainer;
