import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CatProfileNameForm from '../../components/auth/SignUp/CatProfileImage/CatProfileNameForm';

import useInput from '../../hooks/useInput';
import { SIGN_UP_5, NEXT_PAGE } from '../../modules/auth';

const CatProfileNameFormContainer = () => {
  const [catName, onChangeCatName] = useInput('');
  const [catFeatures, onChangeCatFeatures] = useInput('');

  const dispatch = useDispatch();
  const { previewPath } = useSelector((state) => state.auth);

  /* 페이지 5 - 냥이 이름 특징 등록 후 다음 페이지 */
  const onSubmitSignUp = useCallback(() => {
    dispatch({
      type: SIGN_UP_5,
      data: {
        catName,
        catFeatures,
      },
    });
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [catFeatures, catName, dispatch]);

  return (
    <CatProfileNameForm
      catName={catName}
      onChangeCatName={onChangeCatName}
      catFeatures={catFeatures}
      onChangeCatFeatures={onChangeCatFeatures}
      previewPath={previewPath}
      onSubmitSignUp={onSubmitSignUp}
    />
  );
};

export default CatProfileNameFormContainer;
