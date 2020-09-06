import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../lib/api/firebaseAuth';
import IdentifyForm from '../../components/auth/SignUp/IdentifyForm';
import useInput from '../../hooks/useInput';
import {
  NEXT_PAGE,
  IDENTIFY_REQUEST,
  IDENTIFY_SUCCESS,
  IDENTIFY_FAILURE,
  NUMBER_VERIFY_REQUEST,
  NUMBER_VERIFY_SUCCESS,
  NUMBER_VERIFY_FAILURE,
} from '../../modules/auth';

const IdentifyFormContainer = () => {
  const [username, onChangeUsername] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [authNumber, onChangeAuthNumber] = useInput('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeCheck, setTimeCheck] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [time, setTime] = useState(179);

  const dispatch = useDispatch();
  const { identifyLoading, identifyDone, numberVerifyLoading, numberVerifyDone } = useSelector(
    (state) => state.auth,
  );

  /* 페이지 1 - 휴대폰 번호 길이 확인 */
  useEffect(() => {
    phoneNumber.length === 11 ? setIsSubmitted((prev) => !prev) : setIsSubmitted(false);
  }, [phoneNumber.length]);

  /* 페이지 1 - 휴대폰 인증 타이머 */
  useEffect(() => {
    if (time > 0 && timeCheck) {
      const timer = setInterval(() => {
        setTime((prevNumber) => prevNumber - 1);
      }, 1000);

      const min = Math.floor(time / 60).toString();
      let sec = (time % 60).toString();
      if (sec.length === 1) sec = `0${sec}`;
      setTimeString(`${min}:${sec}`);

      return () => {
        clearInterval(timer);
      };
    }
    if (time <= 0) {
      setTimeCheck(false);
      setTimeString('시간 초과');
    }
  }, [time, timeCheck]);

  /* 페이지 1 - 휴대폰 인증 완료 후 다음 페이지 */
  useEffect(() => {
    // 2 페이지로 이동
    numberVerifyDone &&
      dispatch({
        type: NEXT_PAGE,
      });
  }, [dispatch, numberVerifyDone]);

  /* 페이지 1 - 리캡챠 설정 */
  const setUpRecaptcha = useCallback(() => {
    firebase.auth().languageCode = 'ko';
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
        setTimeCheck((prev) => !prev);
      },
    });
  }, []);

  /* 페이지 1 - 인증번호 받기 */
  const onClcikAuthNumber = useCallback(async () => {
    await dispatch({
      type: IDENTIFY_REQUEST,
    });
    await setUpRecaptcha();
    try {
      const koreaPhoneNumber = `+82 ${phoneNumber}`;
      await firebase
        .auth()
        .signInWithPhoneNumber(koreaPhoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          dispatch({
            type: IDENTIFY_SUCCESS,
          });
        });
    } catch (error) {
      dispatch({
        type: IDENTIFY_FAILURE,
        error,
      });
    }
  }, [dispatch, phoneNumber, setUpRecaptcha]);

  /* 페이지 1 - 인증번호 확인 */
  const onSubmitCheckAuthNumber = useCallback(async () => {
    dispatch({
      type: NUMBER_VERIFY_REQUEST,
    });
    try {
      await window.confirmationResult.confirm(authNumber).then((result) => {
        const { user } = result;
        console.log(user);
        // 2페이지 이동
        dispatch({
          type: NUMBER_VERIFY_SUCCESS,
          data: {
            name: username,
            phoneNumber,
          },
        });
      });
    } catch (error) {
      dispatch({
        type: NUMBER_VERIFY_FAILURE,
        error,
      });
      alert('인증번호가 다릅니다.');
    }
  }, [authNumber, dispatch, phoneNumber, username]);

  return (
    <IdentifyForm
      username={username}
      onChangeUsername={onChangeUsername}
      phoneNumber={phoneNumber}
      onChangePhoneNumber={onChangePhoneNumber}
      authNumber={authNumber}
      onChangeAuthNumber={onChangeAuthNumber}
      onClcikAuthNumber={onClcikAuthNumber}
      onSubmitCheckAuthNumber={onSubmitCheckAuthNumber}
      isSubmitted={isSubmitted}
      identifyLoading={identifyLoading}
      numberVerifyLoading={numberVerifyLoading}
      identifyDone={identifyDone}
      timeString={timeString}
    />
  );
};

export default IdentifyFormContainer;
