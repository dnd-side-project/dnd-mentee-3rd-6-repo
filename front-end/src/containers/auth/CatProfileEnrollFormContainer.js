import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import CatProfileEnrollForm from '../../components/auth/SignUp/CatProfileImage/CatProfileEnrollForm';
import { SIGN_UP_6, NEXT_PAGE, CAT_KIND_ID_REQUEST } from '../../modules/auth';

const CatProfileEnrollFormContainer = () => {
  const [catGender, setCatGender] = useState('MALE');
  const [catWeight, onChangeCatWeight] = useInput(null);
  const [catBirthday, onChangeCatBirthday] = useInput('');
  const [catNeutralized, setCatNeutralized] = useState('TRUE');

  const [currentDay, setCurrentDay] = useState('');

  const [catKindCheck, setCatKindCheck] = useState(null);

  const [selectCheck, setSelectCheck] = useState(false);

  const dispatch = useDispatch();

  const { previewPath, CatKindId, authInfo } = useSelector((state) => state.auth);
  const { catName, catFeatures } = authInfo;

  /* 페이지 6 - 냥이 품종 가져오기 */
  useEffect(() => {
    if (!CatKindId) {
      dispatch({
        type: CAT_KIND_ID_REQUEST,
      });
    }
  }, [CatKindId, dispatch]);

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
  const onSubmitSignUp = useCallback(() => {
    dispatch({
      type: SIGN_UP_6,
      data: {
        catKindId: CatKindId[catKindCheck - 1].id,
        catBirthday,
        catWeight,
        catGender,
        catNeutralized,
      },
    });
    return dispatch({
      type: NEXT_PAGE,
    });
  }, [CatKindId, catBirthday, catGender, catKindCheck, catNeutralized, catWeight, dispatch]);

  return (
    <>
      <CatProfileEnrollForm
        catName={catName}
        catFeatures={catFeatures}
        previewPath={previewPath}
        onSelectCatKindId={onSelectCatKindId}
        selectCheck={selectCheck}
        CatKindId={CatKindId}
        catKindCheck={catKindCheck}
        onClickCatKindCheck={onClickCatKindCheck}
        catWeight={catWeight}
        onChangeCatWeight={onChangeCatWeight}
        currentDay={currentDay}
        catBirthday={catBirthday}
        catGender={catGender}
        onClcikCatGender={onClcikCatGender}
        onChangeCatBirthday={onChangeCatBirthday}
        catNeutralized={catNeutralized}
        onClickCatNeutralized={onClickCatNeutralized}
        onSubmitSignUp={onSubmitSignUp}
      />
    </>
  );
};

export default CatProfileEnrollFormContainer;
