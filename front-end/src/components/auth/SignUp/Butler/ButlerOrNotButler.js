import React from 'react';
import PropTpyes from 'prop-types';
import Slick from 'react-slick';
import { Form } from 'antd';

import { ImageBox, Wrapper, Title, SubTitle, Global, DotsIndicator } from './butlerStyles';
import BottomCol from '../../../common/BottomCol';

const ButlerOrNotButler = ({ username, isServant, setIsServant, nextRegisterPage }) => {
  return (
    <Form onFinish={nextRegisterPage}>
      <Global />
      <Wrapper>
        <Title>{username}님은 어떤 집사인가요?</Title>
        <Slick
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          beforeChange={(current, next) => {
            const nextBool = next === 0;
            setIsServant(nextBool);
          }}
        >
          <ImageBox choice={isServant}>
            <img className="dot1-img" src="http://placekitten.com/200/300" alt="집사" />
          </ImageBox>
          <ImageBox choice={isServant}>
            <img className="dot2-img" src="http://placekitten.com/g/200/300" alt="랜선집사" />
          </ImageBox>
        </Slick>
        <SubTitle>
          {!isServant ? '마음으로 모시는 랜선집사에요' : '냥님을 모시는 집사에요'}
        </SubTitle>
        <DotsIndicator choice={isServant}>
          <span className="dot1" />
          <span className="dot2" />
        </DotsIndicator>
      </Wrapper>
      <BottomCol buttonType="submit" buttonText="다음으로" />
    </Form>
  );
};

ButlerOrNotButler.prototype = {
  username: PropTpyes.string.isRequired,
  isServant: PropTpyes.bool.isRequired,
  setIsServant: PropTpyes.func.isRequired,
  nextRegisterPage: PropTpyes.func.isRequired,
};

export default ButlerOrNotButler;
