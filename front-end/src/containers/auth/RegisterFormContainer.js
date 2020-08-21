import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import firebase from '../../lib/api/firebaseAuth';
import EmailPassword from '../../components/auth/SignUp/EmailPassword';
import ButlerOrNotButler from '../../components/auth/SignUp/Butler/ButlerOrNotButler';

import {
  SIGN_UP_REQUEST,
  IDENTIFY_REQUEST,
  NUMBER_VERIFY_REQUEST,
  IDENTIFY_SUCCESS,
  IDENTIFY_FAILURE,
  NUMBER_VERIFY_SUCCESS,
  NUMBER_VERIFY_FAILURE,
  EMAIL_VALID_REQUEST,
} from '../../modules/user';
import { NEXT_PAGE } from '../../modules/pageNumber';
import useInput from '../../hooks/useInput';
import IdentifyForm from '../../components/auth/SignUp/IdentifyForm';

const RegisterFormContainer = () => {
  const [username, onChangeUsername] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [authNumber, onChangeAuthNumber] = useInput('');

  const [email, onChangeEmail] = useInput('');
  const [prevEmail, setPrevEmail] = useState('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timeCheck, setTimeCheck] = useState(false);
  const [time, setTime] = useState(179);
  const [timeString, setTimeString] = useState('');

  const [isServant, setIsServant] = useState(true);

  const dispatch = useDispatch();
  const {
    identifyLoading,
    identifyDone,
    numberVerifyLoading,
    numberVerifyDone,
    emailValidData,
  } = useSelector((state) => state.user);

  const { page } = useSelector((state) => state.pageNumber);

  const emailInputRef = useRef();

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
    dispatch({
      type: IDENTIFY_REQUEST,
    });
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
            type: IDENTIFY_SUCCESS,
          });
        });
    } catch (error) {
      console.log('getAuthNumber 에러');
      console.error(error);
      dispatch({
        type: IDENTIFY_FAILURE,
      });
    }
  }, [dispatch, phoneNumber, setUpRecaptcha]);

  /* 인증번호 확인 */
  const onSubmitCheckAuthNumber = useCallback(async () => {
    dispatch({
      type: NUMBER_VERIFY_REQUEST,
    });
    try {
      await window.confirmationResult.confirm(authNumber).then((result) => {
        const { user } = result;
        console.log('유저정보');
        console.log(user);
        dispatch({
          type: NUMBER_VERIFY_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: NUMBER_VERIFY_FAILURE,
      });
      alert('인증번호가 다릅니다.');
    }
  }, [authNumber, dispatch]);

  /* 비밀번호 확인 */
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onFocusCheckEmail = useCallback(() => {
    if (prevEmail === email) {
      return null;
    }
    setPrevEmail(() => email);
    return dispatch({
      type: EMAIL_VALID_REQUEST,
      data: email,
    });
  }, [dispatch, email, prevEmail]);

  /* 이메일 패스워드 확인 */
  const onSubmitEmailPassword = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    // 3페이지로 이동
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, password, passwordCheck]);

  const nextRegisterPage = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        name: username,
        phoneNumber,
        email,
        password,
        isServant,
      },
    });
  }, [dispatch, email, isServant, password, phoneNumber, username]);

  useEffect(() => {
    phoneNumber.length === 11 ? setIsSubmitted((prev) => !prev) : setIsSubmitted(false);
  }, [phoneNumber.length]);

  useEffect(() => {
    // 2 페이지로 이동
    numberVerifyDone &&
      dispatch({
        type: NEXT_PAGE,
      });
  }, [dispatch, numberVerifyDone]);

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

  useEffect(() => {
    emailValidData && emailInputRef.current.focus();
    if (email !== prevEmail) {
      emailValidData && emailInputRef.current.focus();
    }
  }, [email, emailValidData, prevEmail]);

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
          emailInputRef={emailInputRef}
          emailValidData={emailValidData}
          onFocusCheckEmail={onFocusCheckEmail}
          onSubmitEmailPassword={onSubmitEmailPassword}
        />
      )}
      {page === 3 && (
        <ButlerOrNotButler
          username={username}
          isServant={isServant}
          setIsServant={setIsServant}
          nextRegisterPage={nextRegisterPage}
        />
      )}
    </>
  );
};

export default RegisterFormContainer;
