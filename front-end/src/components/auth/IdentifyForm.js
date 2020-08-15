import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import FormWrapper from '../common/FormWrapper';
import InputForm from '../common/InputForm';
import BottomCol from '../common/BottomCol';

const IdentifyForm = ({
  username,
  onChangeUsername,
  phoneNumber,
  onChangePhoneNumber,
  authNumber,
  onChangeAuthNumber,
  onClcikAuthNumber,
  onSubmitCheckAuthNumber,
  isSubmitted,
  identifyLoading,
  numberVerifyLoading,
  identifyDone,
  timeString,
}) => {
  return (
    <>
      <div id="recaptcha-container" />
      <FormWrapper onFinish={identifyDone && onSubmitCheckAuthNumber}>
        <div className="input-wrapper">
          <label htmlFor="username">이름</label>
          <br />
          <InputForm
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder="이름을 입력해 주세요"
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone-number">휴대폰 번호</label>
          <br />
          <InputForm
            addonAfter={
              <Button onClick={onClcikAuthNumber} disabled={!isSubmitted}>
                {!identifyDone ? '인증번호 받기' : '인증번호 재전송'}
              </Button>
            }
            type="tel"
            name="phone-number"
            placeholder="휴대폰 번호를 입력해주세요 ( - 제외 )"
            maxLength={11}
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            required
          />
        </div>
        {isSubmitted && (
          <div className="input-wrapper">
            <label htmlFor="auth-number">인증번호</label>
            <br />
            <InputForm
              addonAfter={timeString}
              type="number"
              name="auth-number"
              placeholder="인증번호 6자리 수를 입력해주세요."
              maxLength={6}
              onChange={onChangeAuthNumber}
              value={authNumber}
              time="true"
              required
            />
          </div>
        )}
        <BottomCol
          buttonType="submit"
          loading={identifyLoading || numberVerifyLoading}
          buttonText="다음 단계로"
          disabled={!(authNumber.toString().length === 6 && username)}
        />
      </FormWrapper>
    </>
  );
};

IdentifyForm.prototype = {
  username: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  phoneNumber: PropTypes.number.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  authNumber: PropTypes.number.isRequired,
  onChangeAuthNumber: PropTypes.func.isRequired,
  onClcikAuthNumber: PropTypes.func.isRequired,
  onSubmitCheckAuthNumber: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  identifyLoading: PropTypes.bool.isRequired,
  numberVerifyLoading: PropTypes.bool.isRequired,
  identifyDone: PropTypes.bool.isRequired,
  timeString: PropTypes.string.isRequired,
};

export default React.memo(IdentifyForm);
