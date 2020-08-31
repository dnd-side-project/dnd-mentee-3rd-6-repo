import styled from 'styled-components';
import { Form } from 'antd';

import { pallete } from '../../lib/style/pallete';

export const WriteForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  transform: translateX(-16px);
`;

export const WriteTag = styled.section`
  width: 100vw;
  height: 107px;

  margin-top: 19px;

  border-top: 1px solid ${pallete.gray[3]};

  background: ${pallete.gray[1]};

  & > span {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    color: ${pallete.gray[5]};

    margin-left: 23px;
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

        button {
          height: 28px;
          min-width: 71px;

          border: none;
          outline: none;
          background: ${pallete.white};

          border: 1px solid ${pallete.orange};
          border-radius: 14px;

          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          text-align: center;

          white-space: nowrap;

          color: ${pallete.orange};
        }

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

  /* border: none; */

  border-top: 1px solid ${pallete.gray[3]};

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
  height: 123px;

  display: flex;

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

    width: auto;
    height: 100%;
  }
`;

export const ImageBox = styled.li`
  position: relative;
  width: 86px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 24px;

  span {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    width: 86px;
    height: 80px;

    display: flex;
    justify-content: center;
    align-items: center;

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

export const CatTag = styled.section`
  display: flex;
  flex-direction: column;

  width: 100vw;

  padding-top: 17px;

  background: ${pallete.gray[1]};
  border-top: 1px solid ${pallete.gray[3]};

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    color: ${pallete.gray[6]};

    margin-left: 23px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100vw;

  padding-left: 27px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    outline: none;

    border: none;
    padding: 5px;

    &:last-child {
      margin-left: 10px;
    }
  }
`;
