import styled, { css } from 'styled-components';
import { Input } from 'antd';

import { pallete } from '../../lib/style/pallete';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & + & {
    margin-top: 50px;
  }
`;

export const InputForm = styled(Input)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: left;

  width: 343px;
  padding: 0;
  padding-bottom: 14px;
  margin-top: 31px;

  border: none;
  border-radius: 0;

  border-bottom: 1px solid ${pallete.gray[4]};

  &:focus {
    border: none;
    border-bottom: 1px solid ${pallete.gray[6]};
    outline: none;
    border-radius: 0;
    box-shadow: none;
  }

  &:hover {
    border-bottom: 1px solid ${pallete.gray[6]};
  }

  &::placeholder {
    color: ${pallete.gray[3]};
  }

  /* addon */
  & .ant-input-wrapper.ant-input-group {
    display: flex;
    align-content: center;
    &:focus {
      outline: none;
    }

    & input {
      flex: 0.74;
      padding: 0;
      border: none;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    & .ant-input-group-addon {
      padding: 0;
      background: none;
      border: none;

      p {
        margin-left: 50px;
      }

      color: ${pallete.orange};

      &:focus {
        outline: none;
      }

      & button {
        padding: 4px 10px;

        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        line-height: 14px;
        text-align: center;
        color: ${pallete.white};
        ${(props) =>
          props.addonAfter &&
          css`
            background: ${props.value.length === 11 ? `${pallete.orange}` : `${pallete.gray[3]}`};
          `}

        border: none;

        width: 88px;
        height: 27px;

        border-radius: 14px;

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

export default InputWrapper;
