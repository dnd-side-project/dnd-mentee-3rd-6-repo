import styled, { createGlobalStyle, css } from 'styled-components';
import { pallete } from '../../../../lib/style/pallete';

export const ScrollStop = createGlobalStyle`
${({ selectCheck }) => {
  return selectCheck
    ? css`
        body {
          overflow: hidden;
        }
      `
    : css`
        body {
          overflow: scroll;
        }
      `;
}}
`;

export const PrevImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 180px;
  background: ${pallete.gray[2]};

  border-radius: 50%;
  overflow: hidden;

  margin: 35px auto 0 auto;

  img {
    max-width: 100%;
    height: auto;

    background: ${pallete.gray[2]};
  }
`;

export const ProfileHeader = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;

  text-align: center;

  strong {
    font-weight: bold;
  }
`;

export const ImageBox = styled.div`
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 230px;
  height: 230px;
  background: ${pallete.gray[2]};

  border-radius: 50%;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;

    background: ${pallete.gray[2]};
  }
`;

export const Imagebutton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translate(80px, -60px);
  width: 45px;
  height: 45px;

  color: ${pallete.white};
  font-size: 18px;
  outline: none;

  border: 2px solid ${pallete.white};
  background: ${pallete.orange};
  border-radius: 50%;
  transition: all 0.25s;

  &:active {
    border: 4px solid ${pallete.gray[3]};
    transition: all 0.25s;
  }
`;

export const EnrollImageBox = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 34px;

  span {
    width: 120px;
    height: 120px;
    background: ${pallete.gray[2]};
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

export const CatKindModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  margin: 0 auto;

  background: rgba(0, 0, 0, 0.4);
  z-index: 10;

  .modal-wrapper {
    position: relative;
    width: 288px;
    height: 582px;

    background: ${pallete.white};
    border-radius: 14px;
    overflow: auto;

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      height: 530px;
      overflow-y: scroll;

      li {
        display: flex;
        justify-content: center;
        align-items: center;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        text-align: center;

        color: ${pallete.gray[6]};
      }
    }
    .modal-btn {
      position: sticky;
      bottom: 0;
      left: 0;
      margin: 0 auto;
      width: 288px;
      height: 52px;

      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;
      text-align: center;

      color: ${pallete.orange};
      background: ${pallete.white};

      outline: none;
      border: none;
      border-top: 1px solid ${pallete.gray[3]};
    }
  }
`;

export const CheckButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 254px;
  height: 45px;
  background: ${pallete.white};
  outline: none;
  border: none;

  cursor: pointer;
  ${({ catKindCheck, checkId }) => {
    return catKindCheck === checkId
      ? css`
          background: ${pallete.orange};
        `
      : css`
          background: ${pallete.white};
        `;
  }}
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    margin-top: 22px;

    color: ${pallete.gray[4]};
  }
`;

export default ProfileImageWrapper;
