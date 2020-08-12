import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EmailPassword from '../../components/auth/EmailPassword';
import ButlerOrNotButler from '../../components/auth/ButlerOrNotButler';

import { IDENTIFY_REQUEST, NUMBER_VERIFY_REQUEST } from '../../modules/auth';
import useInput from '../../hooks/useInput';
import IdentifyForm from '../../components/auth/IdentifyForm';
import { NEXT_PAGE } from '../../modules/pageNumber';

const RegisterFormContainer = () => {
  const [username, onChangeUsername] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [authNumber, onChangeAuthNumber] = useInput('');

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bottomText, setBottomText] = useState('인증번호 받기');

  const dispatch = useDispatch();
  const {
    identifyLoading,
    identifyDone,
    numberVerifyLoading,
    numberVerify,
    numberVerifyDone,
  } = useSelector((state) => state.auth);

  const { page } = useSelector((state) => state.pageNumber);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmitPhone = useCallback(() => {
    if (bottomText === '인증번호 받기') {
      dispatch({
        type: IDENTIFY_REQUEST,
        data: {
          username,
          phoneNumber,
        },
      });
    } else {
      numberVerify === parseInt(authNumber, 10)
        ? dispatch({
            type: NUMBER_VERIFY_REQUEST,
            data: {
              phoneNumber,
              username,
            },
          })
        : alert('인증번호가 다릅니다.');
    }
  }, [authNumber, bottomText, dispatch, numberVerify, phoneNumber, username]);

  const onSubmitEmailPassword = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: NEXT_PAGE,
    });
  }, [dispatch, password, passwordCheck]);

  useEffect(() => {
    if (identifyDone) {
      setBottomText('확인');
      setIsSubmitted(true);
    }
    if (numberVerifyDone) {
      dispatch({
        type: NEXT_PAGE,
      });
      setBottomText('다음');
    }
  }, [dispatch, identifyDone, numberVerifyDone]);

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
          onSubmitPhone={onSubmitPhone}
          bottomText={bottomText}
          isSubmitted={isSubmitted}
          identifyLoading={identifyLoading}
          numberVerifyLoading={numberVerifyLoading}
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
          bottomText={bottomText}
        />
      )}
      {page === 3 && <ButlerOrNotButler bottomText={bottomText} />}
    </>
  );
};

export default RegisterFormContainer;
