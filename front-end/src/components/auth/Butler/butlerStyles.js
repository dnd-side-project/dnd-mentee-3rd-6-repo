import styled, { createGlobalStyle, css } from 'styled-components';
import { pallete } from '../../../lib/style/pallete';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 168px;
  left: 0;
  right: 0;
  width: 218px;
  height: 270px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ImageBox = styled.div`
  width: 218px;
  height: 270px;

  /* img {
    width: auto;
    height: 100%;
    margin: 0 auto;
    background: ${pallete.white};
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 14px;
  } */

  ${({ choice }) => {
    return choice === 0
      ? css`
          .dot1-img {
            transform: scale(1.1);
            transition: all 0.25s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
            border-radius: 14px;
          }
          .dot2-img {
            transform: scale(0.9);
            transition: all 0.25s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
            border-radius: 14px;
          }
        `
      : css`
          .dot1-img {
            transform: scale(0.9);
            transition: all 0.25s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
            border-radius: 14px;
          }
          .dot2-img {
            transform: scale(1.1);
            transition: all 0.25s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
            border-radius: 14px;
          }
        `;
  }}
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  text-align: center;

  margin-bottom: 78px;

  width: 343px;

  color: ${pallete.gray[6]};
`;

export const SubTitle = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  margin-top: 36px;

  color: ${pallete.gray[4]};
`;

export const DotsIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 34px;

  width: 24px;

  span {
    width: 8px;
    height: 8px;

    border-radius: 50%;
  }

  ${({ choice }) =>
    choice === 0
      ? css`
          .dot1 {
            transform: scale(1.3);
            transition: all 0.25s;

            background: ${pallete.orange};
          }
          .dot2 {
            transition: all 0.25s;
            background: ${pallete.gray[3]};
          }
        `
      : css`
          .dot1 {
            transition: all 0.25s;

            background: ${pallete.gray[3]};
          }
          .dot2 {
            transform: scale(1.3);
            transition: all 0.25s;

            background: ${pallete.orange};
          }
        `};
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-flexbox;
    justify-content: center;
  }

  .slick-list {
    width: 218px;
    height: 270px;
  }

  .slick-trak {
    width: 218px;
    height: 270px;
    div {
      margin: 0 auto;
    }
  }
`;
