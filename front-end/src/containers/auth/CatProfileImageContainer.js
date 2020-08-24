import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import CatProfileImageForm from '../../components/auth/SignUp/CatProfileImage';
import CatProfileNameForm from '../../components/auth/SignUp/CatProfileImage/CatProfileNameForm';
import CatProfileEnrollForm from '../../components/auth/SignUp/CatProfileImage/CatProfileEnrollForm';
import { SIGN_UP_2_REQUEST, SIGN_UP_3_REQUEST, CAT_KIND_ID_REQUEST } from '../../modules/user';
import { NEXT_PAGE } from '../../modules/pageNumber';

const ProfileImageContainer = () => {
  const [catName, onChangeCatName] = useInput('');
  const [catFeatures, onChangeCatFeatures] = useInput('');
  const [catGender, setCatGender] = useState('MALE');
  const [catBirthday, onChangeCatBirthday] = useInput('');
  const [catNeutralized, setCatNeutralized] = useState('TRUE');

  const [currentDay, setCurrentDay] = useState('');

  const [catKindCheck, setCatKindCheck] = useState(null);

  const [selectCheck, setSelectCheck] = useState(false);
  const [prevImagePath, setPrevImagePath] = useState({
    file: '',
    previewPath: '',
  });

  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.pageNumber);
  const { CatKindId } = useSelector((state) => state.user);

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

  /* 페이지 5 - 냥이 이름 특징 등록 후 다음 페이지 */
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

  /* 페이지 6 - 냥이 품종 모달 */
  const onSelectCatKindId = useCallback(() => {
    setSelectCheck((prev) => !prev);
  }, []);

  /* 페이지 6 - 냥이 품종 선택 */
  const onClickCatKindCheck = useCallback(
    (index) => () => {
      setCatKindCheck(() => index);
    },
    [],
  );

  /* 페이지 6 - 냥이 성별 선택 */
  const onClcikCatGender = useCallback((e) => {
    setCatGender(e.target.value);
  }, []);

  /* 페이지 6 - 냥이 중성화 선택 */
  const onClickCatNeutralized = useCallback((e) => {
    setCatNeutralized(e.target.value);
  }, []);

  /* 페이지 6 - 기타 냥이 정보 등록 후 다음페이지 */
  const onSubmitCatFeatures = useCallback(() => {
    dispatch({
      type: SIGN_UP_3_REQUEST,
      data: {
        catKindId: CatKindId[catKindCheck - 1].id,
        catGender,
        catBirthday,
        catNeutralized,
      },
    });
  }, [CatKindId, catBirthday, catGender, catKindCheck, catNeutralized, dispatch]);

  /* 페이지 6 - 냥이 품종 가져오기 */
  // useEffect(() => {
  //   if (page === 6) {
  //     dispatch({
  //       type: CAT_KIND_ID_REQUEST,
  //     });
  //   }
  // }, [dispatch, page]);

  /* 페이지 6 - 오늘 날짜 가져오기 */
  useEffect(() => {
    if (!currentDay) {
      const today = new Date();

      const year = today.getFullYear(); // 년도
      const month = today.getMonth() + 1; // 월
      const date = today.getDate(); // 날짜
      setCurrentDay(
        () => `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onSelectCatKindId={onSelectCatKindId}
          selectCheck={selectCheck}
          CatKindId={CatKindId}
          catKindCheck={catKindCheck}
          onClickCatKindCheck={onClickCatKindCheck}
          catGender={catGender}
          onClcikCatGender={onClcikCatGender}
          currentDay={currentDay}
          catBirthday={catBirthday}
          onChangeCatBirthday={onChangeCatBirthday}
          catNeutralized={catNeutralized}
          onClickCatNeutralized={onClickCatNeutralized}
          onSubmitCatFeatures={onSubmitCatFeatures}
        />
      )}
    </>
  );
};

export default ProfileImageContainer;
