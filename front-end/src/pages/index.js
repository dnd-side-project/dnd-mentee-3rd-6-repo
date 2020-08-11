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
  justify-content: space-around;
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

  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  h2 {
    text-align: center;
    font-weight: bold;
    font-size: 28px;
  }

  img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const AuthButton = styled(Button)`
  text-align: center;
  background: ${pallete.orange};
  border: 1px solid #fc8210;

  &:hover {
    background: ${pallete.orange};
    border: 1px solid ${pallete.orange};
  }

  &:active {
    background: ${darken(0.1, pallete.orange)};
    border: 1px solid ${pallete.orange};
  }

  & + & {
    margin-top: 20px;
  }
`;

const Home = () => {
  return (
    <HomeLayout>
      <HomeHeader>
        <h1>우리 동네 집사 커뮤니티</h1>
        <img src={logo} alt="우동집 로고" />
        <h2>우동집</h2>
      </HomeHeader>
      <div>
        <AuthButton type="primary" shape="round" size="large">
          <Link to="/login">로그인</Link>
        </AuthButton>
        <AuthButton type="primary" shape="round" size="large">
          <Link to="/register">회원가입</Link>
        </AuthButton>
      </div>
    </HomeLayout>
  );
};

export default Home;
