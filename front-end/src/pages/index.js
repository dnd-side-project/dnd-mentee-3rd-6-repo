import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

import logo from '../logo.svg';
import { pallete } from '../lib/style/pallete';

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    width: 64px;
    height: 43px;
    left: 56px;
    top: 344px;

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 19px;
    text-align: center;

    background: ${pallete.gray[3]};
    border-radius: 14px;
  }
`;

const HomeHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 148px;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 155%;

    text-align: center;
    margin-bottom: 88px;
  }

  img {
    width: 163px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 55px;
  }
`;

const AuthButton = styled(Button)`
  width: 315px;
  height: 55px;
  margin: 0 auto;
  border-radius: 14px;
  color: ${pallete.gray[6]};

  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  background: ${pallete.gray[3]};
  border: none;

  transition: all 0.125s;

  &:hover {
    background: ${pallete.gray[3]};
    border: none;
  }

  &:active {
    background: ${pallete.orange};
    border: none;
  }

  & + & {
    margin-top: 20px;
  }
`;

const Home = () => {
  return (
    <HomeLayout>
      <HomeHeader>
        <h1>
          안녕하세요 집사님! <br /> 우동집에 오신걸 환영합니다 'ᴗ'
        </h1>
        <img src={logo} alt="우동집 로고" />
      </HomeHeader>
      <span>안냥!</span>
      <div>
        <AuthButton type="primary" shape="round">
          <Link to="/login">로그인</Link>
        </AuthButton>
        <AuthButton type="primary" shape="round">
          <Link to="/register">회원가입</Link>
        </AuthButton>
      </div>
    </HomeLayout>
  );
};

export default Home;
