import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { darken } from 'polished';

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
`;

const HomeHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 250px;

  h1 {
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
    strong {
      color: ${pallete.orange};
    }
  }

  h2 {
    font-weight: 800;
    font-size: 30px;
    line-height: 41px;
    text-align: center;
  }

  img {
    width: 163px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const AuthButton = styled(Button)`
  width: 100%;
  height: 50px;
  text-align: center;
  color: black;
  background: ${pallete.gray};
  border: 1px solid ${pallete.gray};

  &:hover {
    background: ${pallete.gray};
    border: 1px solid ${pallete.gray};
  }

  &:active {
    background: ${darken(0.1, pallete.gray)};
    border: 1px solid ${pallete.gray};
  }

  &:last-child {
    margin-bottom: 61px;
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
          <strong>우</strong>리 <strong>동</strong>네 <strong>집</strong>사 커뮤니티
        </h1>
        <img src={logo} alt="우동집 로고" />
        <h2>우동집</h2>
      </HomeHeader>
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
