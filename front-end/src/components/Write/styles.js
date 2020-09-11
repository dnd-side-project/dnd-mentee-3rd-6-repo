import styled, { css } from 'styled-components';
import { Form } from 'antd';

import { pallete } from '../../lib/style/pallete';

export const WriteForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;

  transform: translateX(-16px);

  margin-top: 50px;
`;

export const WriteWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 61.5vh;
`;

export const WriteTag = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 96px;

  border-top: 1px solid ${pallete.gray[3]};
  border-bottom: 1px solid ${pallete.gray[3]};

  & > span {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;

    color: ${pallete.primary[1]};

    padding-top: 16px;
    margin-left: 16px;
  }

  .write-tag {
    position: relative;
    width: 100vw;
    height: 56px;

    padding-top: 16px;

    overflow-x: auto;
    overflow-y: hidden;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }

    ul {
      position: absolute;
      top: 13px;
      left: 0;

      width: auto;
      height: 28px;

      display: flex;

      li {
        margin-left: 9px;

        &:first-child {
          margin-left: 16px;
        }

        &:last-child {
          margin-right: 16px;
        }
      }
    }
  }
`;

export const TextArea = styled.textarea`
  width: 100vw;
  height: 30vh;
  padding: 19px;

  border: none;
  resize: none;
  outline: none;

  &::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;

    color: ${pallete.gray[3]};
  }
`;

export const Image = styled.div`
  position: relative;
  width: 100vw;
  height: 95px;

  padding: 0 16px;

  overflow-x: auto;
  overflow-y: hidden;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ul {
    position: absolute;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: auto;
    height: 100%;
  }
`;

export const ImageBox = styled.li`
  position: relative;
  width: 86px;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    width: 86px;
    height: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    background: ${pallete.gray[1]};

    img {
      position: absolute;
      top: 0;
      width: auto;
      height: 80px;
    }
  }

  button {
    position: absolute;
    top: -5px;
    right: -5px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    outline: none;
    background: none;

    padding: 0;

    z-index: 999;
  }

  &:last-child {
    margin-right: 16px;
  }

  & + & {
    margin-left: 12px;
  }
`;

export const ButtonsWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: auto;

  background: ${pallete.gray[1]};

  & div:first-child {
    display: flex;
    width: 100%;

    margin-top: 30px;

    .input-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 36px;

      outline: none;
      background: none;

      border: none;
      padding: 5px;

      &:last-child {
        margin-left: 10px;
      }
    }
  }
`;

export const Tolltip = styled.div`
  @keyframes showTooltip {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(20px);
    }
    70% {
      transform: translateY(18px);
    }
    90% {
      transform: translateY(23px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes hiddenTooltip {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }

  position: absolute;

  top: -70px;
  left: 15px;

  p {
    position: absolute;
    top: 0;
    left: 0;
    width: 152px;
    height: 31px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${pallete.secondary[1]};
    border-radius: 14px;

    span {
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;

      color: ${pallete.primary[3]};

      margin-right: 5px;
    }
  }

  .arrow {
    position: absolute;
    top: 30px;
    left: 30px;

    border-top: 15px solid ${pallete.secondary[1]};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }

  ${({ focus }) => {
    return focus
      ? css`
          animation: hiddenTooltip 0.5s forwards;
        `
      : css`
          animation: showTooltip 1s infinite;
        `;
  }}
`;

export const CatTagWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 66vh;
  width: 100%;
`;

export const CatTagHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 150.2%;
    text-align: center;

    color: ${pallete.primary[1]};
  }
`;

export const CatTagList = styled.div`
  position: relative;

  width: 100%;
  height: 220px;

  display: flex;
  align-items: center;

  margin-top: 60px;

  overflow-y: hidden;
  overflow-x: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ul {
    position: absolute;

    display: flex;
    align-items: center;

    width: auto;
    height: 220px;
  }
`;

export const CatTagItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    position: relative;

    border: none;
    outline: none;
    background: none;
    padding: 0;

    border-radius: 50%;

    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);

    ${({ check, checkId }) =>
      check === checkId &&
      css`
        border: 5px solid ${pallete.secondary[1]};
      `}

    & .img-box {
      display: flex;
      justify-content: center;
      align-items: center;

      ${({ check, checkId }) =>
        check === checkId
          ? css`
              width: 120px;
              height: 120px;
            `
          : css`
              width: 130px;
              height: 130px;
            `}

      border-radius: 50%;

      background: ${pallete.gray[3]};

      overflow: hidden;

      img {
        width: auto;
        height: 130px;

        background: ${pallete.primary[3]};
      }
    }

    & .check {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 30px;
      height: 30px;

      border-radius: 50%;
      background: ${pallete.secondary[1]};

      display: flex;
      justify-content: center;
      align-items: center;

      z-index: 999;
    }
  }

  p {
    margin-top: 16px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-align: center;

    color: ${pallete.primary[1]};
  }

  & + & {
    margin-left: 26px;
  }

  &:first-child {
    margin-left: 44px;
  }

  &:last-child {
    margin-right: 44px;
  }
`;

export const CatTagNullBox = styled.div`
  width: 216px;
  height: 33px;
`;

export const CatTagTooltip = styled.div`
  @keyframes showTooltip {
    0% {
      transform: translateY(-10px);
    }
    30% {
      transform: translateY(10px);
    }
    70% {
      transform: translateY(8px);
    }
    90% {
      transform: translateY(13px);
    }
    100% {
      transform: translateY(-10px);
    }
  }

  position: relative;
  width: 216px;
  height: 33px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${pallete.primary[3]};
  border-radius: 14px;

  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);

  p {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 150%;

    color: ${pallete.primary[1]};
  }

  .arrow {
    position: absolute;
    top: 30px;
    left: 50px;

    border-top: 15px solid ${pallete.primary[3]};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }

  animation: showTooltip 1s infinite;
`;
