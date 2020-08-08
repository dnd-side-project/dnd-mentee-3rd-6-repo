import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { darken } from 'polished';

import { pallete } from '../lib/style/pallete';

const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  img {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
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
      <img
        src="https://t1.daumcdn.net/liveboard/catlab/df4476dc4598433bb29710242487ed4c.JPG"
        alt="우동집 로고"
      />
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
