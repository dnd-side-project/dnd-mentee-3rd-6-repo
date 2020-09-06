import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { pallete } from '../../lib/style/pallete';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexRow }) => (flexRow ? 'row' : 'column')};
  align-items: ${({ flexRow }) => (flexRow ? 'flex-start' : 'center')};
  justify-content: ${({ flexRow }) => (flexRow ? 'space-between' : 'center')};

  margin-top: ${({ top }) => top};

  width: 100%;
`;

export const InputForm = styled(Input)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  color: ${pallete.primary[1]};

  text-align: left;

  width: ${({ width }) => width || '91vw'};
  padding: 0;
  padding-bottom: 14px;
  margin-top: ${({ top }) => top || '31px'};

  border: none;
  outline: none;
  border-radius: 0;

  border-bottom: 1px solid ${({ value }) => (value ? pallete.primary[1] : pallete.gray[3])};
  border-bottom: ${({ bordercolor }) =>
    bordercolor === 'true' ? `1px solid ${pallete.ui[1]}` : null};

  &:focus {
    border-bottom: 1px solid ${pallete.secondary[2]};
    box-shadow: none;
  }

  &:hover {
    border-bottom: 1px solid ${pallete.secondary[2]};
  }

  &::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    color: ${pallete.gray[3]};
  }

  &[type='date']:before {
    content: ${({ value }) => (value ? `attr(${value})` : 'attr(data-placeholder)')};
    width: 100%;

    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    color: ${pallete.gray[3]};
  }

  /* addon */
  & .ant-input-wrapper.ant-input-group {
    display: flex;
    align-content: center;

    &:focus {
      outline: none;
      box-shadow: none;
    }

    & input {
      flex: ${({ flex }) => flex || 0.7};
      padding: 0;
      border: none;

      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;

      color: ${pallete.primary[1]};

      &::placeholder {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;

        color: ${pallete.gray[3]};
      }

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
        font-weight: 500;
        font-size: 11px;
        line-height: 15px;
        text-align: center;
        ${({ authbtn, value }) => {
          return authbtn && value.length === 11
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

        width: 102px;
        height: 27px;

        border-radius: 14px;

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
