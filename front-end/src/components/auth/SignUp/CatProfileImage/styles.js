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

  width: 160px;
  height: 160px;
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

  color: ${pallete.primary[1]};
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
  position: absolute;
  bottom: 12px;
  right: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* transform: translate(80px, -60px); */
  width: 45px;
  height: 45px;

  color: ${pallete.primary[3]};
  font-size: 18px;
  outline: none;

  border: 3px solid ${pallete.primary[3]};
  background: ${pallete.secondary[1]};
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

  .img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 100px;
    background: ${pallete.gray[2]};
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .info-wrapper {
    display: flex;
    flex-direction: column;

    color: ${pallete.primary[1]};
    margin-left: 22px;

    dt {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;

      padding: 0 20px;
    }

    dd {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;

      padding: 0 20px;
      margin-top: 20px;
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
    height: 80vh;

    background: ${pallete.primary[3]};
    border-radius: 14px;
    overflow-x: hidden;
    overflow-y: scroll;

    ul {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 70vh;
      margin: 0 auto;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      overflow-y: scroll;

      li {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 288px;
        min-height: 52px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        text-align: center;

        color: ${pallete.gray[6]};
      }
    }

    .modal-btn {
      position: absolute;
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

      color: ${pallete.primary[2]};
      background: ${pallete.primary[3]};

      outline: none;
      border: none;
      border-top: 1px solid ${pallete.gray[2]};
    }
  }
`;

export const CheckButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 254px;
  height: 45px;
  outline: none;
  border: none;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  color: ${pallete.primary[1]};

  ${({ catKindCheck, checkId }) => {
    return catKindCheck === checkId
      ? css`
          background: ${pallete.secondary[2]};
        `
      : css`
          background: ${pallete.primary[3]};
        `;
  }}
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .second {
    position: relative;

    display: flex;
    justify-content: center;
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    margin-top: 27px;

    color: ${pallete.gray[6]};
  }
`;

export default ProfileImageWrapper;
