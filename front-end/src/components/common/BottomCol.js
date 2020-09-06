import React from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const BottomWarrper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  ${({ top, bottom }) => {
    return css`
      margin-top: ${top};
      margin-bottom: ${bottom};
    `;
  }}
`;

const Btn = styled(Button)`
  width: 310px;
  height: 54px;
  border: none;
  text-shadow: none;

  background: ${pallete.primary[2]};
  color: ${pallete.primary[3]};
  border-radius: 14px;

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;

  &[disabled] {
    background: ${pallete.gray[3]};
    color: ${pallete.primary[3]};
  }

  &[disabled]:hover {
    background: ${pallete.gray[3]};
    color: ${pallete.primary[3]};
  }

  &:hover {
    background: ${pallete.gray[3]};
  }

  &:focus {
    background: ${pallete.gray[3]};
  }

  &:active {
    background: ${pallete.primary[2]};
  }
`;

const BottomCol = ({ buttonType, loading, buttonText, disabled, top, bottom }) => {
  return (
    <BottomWarrper top={top} bottom={bottom}>
      <Btn type="primary" size="large" htmlType={buttonType} loading={loading} disabled={disabled}>
        {buttonText}
      </Btn>
    </BottomWarrper>
  );
};

BottomCol.prototype = {
  buttonType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  top: PropTypes.string.isRequired,
  bottom: PropTypes.string.isRequired,
};

export default BottomCol;
