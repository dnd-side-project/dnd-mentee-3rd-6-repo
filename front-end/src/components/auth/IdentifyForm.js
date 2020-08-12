import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../common/FormWrapper';
import InputForm from '../common/InputForm';
import BottomCol from '../common/BottomCol';

const IdentifyForm = ({
  username,
  onChangeUsername,
  phoneNumber,
  onChangePhoneNumber,
  onSubmitPhone,
  authNumber,
  onChangeAuthNumber,
  bottomText,
  isSubmitted,
  identifyLoading,
  numberVerifyLoading,
}) => {
  return (
    <FormWrapper onFinish={onSubmitPhone}>
      <div className="input-wrapper">
        <label htmlFor="username">이름</label>
        <br />
        <InputForm
          type="text"
          name="username"
          value={username}
          onChange={onChangeUsername}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="phone-number">휴대폰 번호</label>
        <br />
        <InputForm
          type="tel"
          name="phone-number"
          placeholder="'-' 제외"
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
            type="number"
            name="auth-number"
            onChange={onChangeAuthNumber}
            value={authNumber}
            required
          />
        </div>
      )}
      <BottomCol
        bottomText={bottomText}
        buttonType="submit"
        loading={identifyLoading || numberVerifyLoading}
      />
    </FormWrapper>
  );
};

IdentifyForm.prototype = {
  onSubmitPhone: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  phoneNumber: PropTypes.number.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  bottomText: PropTypes.string.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  onChangeAuthNumber: PropTypes.func.isRequired,
  authNumber: PropTypes.number.isRequired,
  identifyLoading: PropTypes.bool.isRequired,
  numberVerifyLoading: PropTypes.bool.isRequired,
};

export default IdentifyForm;
