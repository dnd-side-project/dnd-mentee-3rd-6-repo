import styled from 'styled-components';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const InputForm = styled(Input)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: left;

  width: 343px;
  padding: 0;
  padding-bottom: 14px;
  margin-top: 26px;

  border: none;
  border-radius: 0;

  border-bottom: 1px solid ${pallete.gray[3]};

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
      flex: 0.75;
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
        margin-left: 30px;
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
        background: ${(props) =>
          props.value.length === 11 ? `${pallete.orange}` : `${pallete.gray[3]}`};

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

InputForm.prototype = {
  primary: PropTypes.bool.isRequired,
};

export default InputForm;
