import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { pallete } from '../../lib/style/pallete';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexRow }) => (flexRow ? 'row' : 'column')};
  align-items: ${({ flexRow }) => (flexRow ? 'flex-start' : 'center')};
  justify-content: ${({ flexRow }) => (flexRow ? 'space-between' : 'column')};

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

  width: ${({ width }) => width || '91vw'};
  padding: 0;
  padding-bottom: 14px;
  margin-top: ${({ top }) => top || '31px'};

  border: none;
  border-radius: 0;

  border-bottom: 1px solid ${pallete.gray[3]};

  &:focus {
    border: none;
    border-bottom: 1px solid ${pallete.primary[1]};
    outline: none;
    border-radius: 0;
    box-shadow: none;
  }

  &:hover {
    border-bottom: 1px solid ${pallete.primary[1]};
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
      flex: ${({ flex }) => flex || 0.7};
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
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        text-align: center;

        margin-left: ${({ addonpx }) => addonpx};
      }

      color: ${({ color }) => color || pallete.primary[2]};

      &:focus {
        outline: none;
      }

      & .ant-btn {
        padding: 4px 10px;

        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        line-height: 14px;
        text-align: center;
        ${(props) => {
          return props.addonTrue && props.value.length === 11
            ? css`
                background: ${pallete.primary[2]};
                color: ${pallete.primary[3]};
              `
            : css`
                background: ${pallete.gray[2]};
                color: ${pallete.primary[1]};
              `;
        }}

        border: none;

        width: 104px;
        height: 30px;

        border-radius: 15px;

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

InputWrapper.prototype = {
  flexRow: PropTypes.bool.isRequired,
};

export default InputWrapper;
