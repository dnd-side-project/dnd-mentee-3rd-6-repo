import React from 'react';
import { Input } from 'antd';

import AuthTemplate from './AuthTemplate';
import FormWrapper from '../common/FormWrapper';

const LoginForm = ({ ...rest }) => {
  return (
    <FormWrapper onFinish={rest.onSubmitLogin}>
      <AuthTemplate
        title="로그인"
        subTitle="설명글 쓰는 공간"
        bottomText="로그인"
        buttonType="submit"
        loading={rest.logInLoading}
      >
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <br />
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요."
            onChange={rest.onChangeEmail}
            value={rest.email}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">패스워드</label>
          <br />
          <Input
            visibilityToggle
            type="password"
            name="password"
            placeholder="패스워드를 입력하세요."
            onChange={rest.onChangePassword}
            value={rest.password}
            required
          />
        </div>
      </AuthTemplate>
    </FormWrapper>
  );
};

export default LoginForm;
