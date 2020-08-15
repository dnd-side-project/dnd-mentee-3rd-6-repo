import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const Bottom = styled.div`
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-content: center;
`;

const ButtonWarrper = styled(Button)`
  width: 310px;
  height: 54px;
  color: ${pallete.white};
  background: ${pallete.orange};
  border: none;
  border-radius: 14px;
  text-shadow: none;

  &:hover {
    background: ${pallete.orange};
  }

  &:active {
    background: ${pallete.orange};
  }

  &:focus {
    background: ${pallete.orange};
  }
`;

const BottomCol = ({ buttonType, loading, buttonText, disabled }) => {
  return (
    <Bottom>
      <ButtonWarrper
        type="primary"
        size="large"
        htmlType={buttonType}
        loading={loading}
        disabled={disabled}
      >
        {buttonText}
      </ButtonWarrper>
    </Bottom>
  );
};

BottomCol.prototype = {
  buttonType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default BottomCol;
