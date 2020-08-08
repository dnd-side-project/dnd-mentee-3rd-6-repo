import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Input } from 'antd';

import FormWrapper from '../common/FormWrapper';
import useInput from '../../hooks/useInput';
import AuthTemplate from './AuthTemplate';

const RegisterForm = () => {
  const [username, onChangeUsername] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');
  const [authNumber, onChangeAuthNumber] = useInput('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bottomText, setBottomText] = useState('인증번호 받기');

  const authNumberInput = useRef();

  const onSubmitPhone = useCallback(() => {
    if (bottomText === '인증번호 받기') {
      console.log(username, phoneNumber);
      setIsSubmitted(true);
      setBottomText('확인');
    } else {
      console.log(authNumber);
    }
  }, [bottomText, username, phoneNumber, authNumber]);

  useEffect(() => {
    if (isSubmitted) {
      authNumberInput.current.focus();
      console.log(isSubmitted);
    }
  }, [isSubmitted]);

  return (
    <FormWrapper onFinish={onSubmitPhone}>
      <AuthTemplate
        title="회원가입"
        subTitle="인증 절차를 꼼꼼히 하는거에 대한 설명"
        bottomText={bottomText}
        buttonType="submit"
      >
        <div className="input-wrapper">
          <label htmlFor="username">이름</label>
          <br />
          <Input
            bordered
            type="text"
            name="username"
            placeholder="이름을 입력하세요."
            onChange={onChangeUsername}
            value={username}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone-number">휴대폰 번호</label>
          <br />
          <Input
            type="tel"
            name="phone-number"
            placeholder="'-' 제외"
            prefix="010"
            maxLength={8}
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            required
          />
        </div>
        {isSubmitted && (
          <div className="input-wrapper">
            <label htmlFor="auth-number">인증번호</label>
            <br />
            <Input
              type="number"
              name="auth-number"
              onChange={onChangeAuthNumber}
              value={authNumber}
              ref={authNumberInput}
              required
            />
          </div>
        )}
      </AuthTemplate>
    </FormWrapper>
  );
};

export default RegisterForm;
