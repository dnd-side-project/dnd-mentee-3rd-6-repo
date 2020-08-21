import React, { useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import ProfileImageUpload from '../../components/auth/ProfileImage/ProfileImageUpload';
import ProfileName from '../../components/auth/ProfileImage/ProfileName';
import { UPLOAD_IMAGE_REQUEST } from '../../modules/user';
import { NEXT_PAGE } from '../../modules/pageNumber';

const ProfileImageContainer = () => {
  const [catName, onChangeCatName] = useInput('');
  const [character, onChangeCharacter] = useInput('');
  const [prevImagePath, setPrevImagePath] = useState({
    file: '',
    previewPath: '',
  });

  const dispatch = useDispatch();
  const { uploadImageDone } = useSelector((state) => state.user);
  const { page } = useSelector((state) => state.pageNumber);

  const imageInputRef = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInputRef.current.click();
  }, []);

  const onChangeImage = useCallback((e) => {
    const reader = new FileReader();
    const filePath = e.target.files[0];
    reader.onload = () => {
      setPrevImagePath({
        file: filePath,
        previewPath: reader.result,
      });
    };
    reader.readAsDataURL(filePath);
  }, []);

  const onNextProfilePage = useCallback(() => {
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch]);

  const onSubmitImage = useCallback(() => {
    const imageFormData = new FormData();
    imageFormData.append('profileImg', prevImagePath.file);
    imageFormData.append('name', catName);
    imageFormData.append('featuers', character);

    return dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, [catName, character, dispatch, prevImagePath.file]);

  return (
    <>
      {page === 4 && (
        <ProfileImageUpload
          imageInputRef={imageInputRef}
          onClickImageUpload={onClickImageUpload}
          onChangeImage={onChangeImage}
          prevImagePath={prevImagePath}
          onNextProfilePage={onNextProfilePage}
        />
      )}
      {page === 5 && (
        <ProfileName
          catName={catName}
          onChangeCatName={onChangeCatName}
          character={character}
          onChangeCharacter={onChangeCharacter}
          onSubmitImage={onSubmitImage}
          previewPath={prevImagePath.previewPath}
          uploadImageDone={uploadImageDone}
        />
      )}
    </>
  );
};

export default ProfileImageContainer;
