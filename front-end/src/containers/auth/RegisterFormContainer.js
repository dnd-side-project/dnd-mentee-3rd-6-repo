import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../lib/api/firebaseAuth';
import EmailPassword from '../../components/auth/EmailPassword';
import ButlerOrNotButler from '../../components/auth/ButlerOrNotButler';

import { IDENTIFY_REQUEST, NUMBER_VERIFY_REQUEST } from '../../modules/auth';
import { NEXT_PAGE } from '../../modules/pageNumber';
import useInput from '../../hooks/useInput';
import IdentifyForm from '../../components/auth/IdentifyForm';

const RegisterFormContainer = () => {
  const [username, onChangeUsername] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [authNumber, onChangeAuthNumber] = useInput('');

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [timeCheck, setTimeCheck] = useState(false);
  const [time, setTime] = useState(179);
  const [timeString, setTimeString] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { identifyLoading, identifyDone, numberVerifyLoading, numberVerifyDone } = useSelector(
    (state) => state.auth,
  );

  const { page } = useSelector((state) => state.pageNumber);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  /* 리캡챠 설정 */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setUpRecaptcha = () => {
    firebase.auth().languageCode = 'ko';
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
        setTimeCheck((prev) => !prev);
      },
    });
  };

  /* 인증번호 받기 */
  const onClcikAuthNumber = useCallback(async () => {
    setUpRecaptcha();
    const koreaPhoneNumber = `+82 ${phoneNumber}`;
    try {
      await firebase
        .auth()
        .signInWithPhoneNumber(koreaPhoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
          console.log('문자전송 완료', confirmationResult);
          window.confirmationResult = confirmationResult;
          dispatch({
            type: IDENTIFY_REQUEST,
            data: confirmationResult,
          });
        });
    } catch (error) {
      console.log('getAuthNumber 에러');
      console.error(error);
    }
  }, [dispatch, phoneNumber, setUpRecaptcha]);

  /* 인증번호 확인 */
  const onSubmitCheckAuthNumber = useCallback(async () => {
    try {
      await window.confirmationResult.confirm(authNumber).then((result) => {
        const { user } = result;
        console.log('유저정보');
        console.log(user);
        dispatch({
          type: NUMBER_VERIFY_REQUEST,
          data: {
            phoneNumber,
            username,
          },
        });
      });
    } catch (error) {
      alert('인증번호가 다릅니다.');
    }
  }, [authNumber, dispatch, phoneNumber, username]);

  /* 이메일 패스워드 확인 */
  const onSubmitEmailPassword = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, password, passwordCheck]);

  useEffect(() => {
    phoneNumber.length === 11 ? setIsSubmitted((prev) => !prev) : setIsSubmitted(false);

    // 인증번호 확인 후 맞으면 실행
    numberVerifyDone &&
      dispatch({
        type: NEXT_PAGE,
      });
  }, [dispatch, numberVerifyDone, phoneNumber.length]);

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
    if (time === 0) {
      setTimeCheck(false);
      setTimeString('시간 초과');
    }
  }, [time, timeCheck]);

  return (
    <>
      {page === 1 && (
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
      )}
      {page === 2 && (
        <EmailPassword
          email={email}
          onChangeEmail={onChangeEmail}
          password={password}
          onChangePassword={onChangePassword}
          passwordCheck={passwordCheck}
          onChangePasswordCheck={onChangePasswordCheck}
          passwordError={passwordError}
          onSubmitEmailPassword={onSubmitEmailPassword}
        />
      )}
      {page === 3 && <ButlerOrNotButler />}
    </>
  );
};

export default RegisterFormContainer;
