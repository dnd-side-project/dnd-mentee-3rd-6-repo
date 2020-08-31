import styled, { css } from 'styled-components';
import { pallete } from '../../../../lib/style/pallete';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SliderWrapper = styled.div`
  width: 218px;
  height: 270px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 14px;

  .slick-list {
    width: 218px;
    height: 270px;
  }

  .slick-slide {
    width: 218px;
    height: 270px;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 218px;
  height: 270px;

  overflow: hidden;

  ${({ choice }) => {
    return choice
      ? css`
          .dot1-img {
            transition: all 0.2s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
          }
          .dot2-img {
            transform: scale(0.7);
            transition: all 0.2s;
            opacity: 0.5;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
          }
        `
      : css`
          .dot1-img {
            transform: scale(0.7);
            transition: all 0.2s;
            opacity: 0.5;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
            border-radius: 14px;
          }
          .dot2-img {
            transition: all 0.2s;

            width: auto;
            height: 100%;
            margin: 0 auto;
            background: ${pallete.white};
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
    choice
      ? css`
          .dot1 {
            transform: scale(1.4);
            transition: all 0.2s;

            background: ${pallete.orange};
          }
          .dot2 {
            transition: all 0.25s;
            background: ${pallete.gray[3]};
          }
        `
      : css`
          .dot1 {
            transition: all 0.2s;

            background: ${pallete.gray[3]};
          }
          .dot2 {
            transform: scale(1.4);
            transition: all 0.25s;

            background: ${pallete.orange};
          }
        `};
`;
