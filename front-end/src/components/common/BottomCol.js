import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const BottomWarrper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin: 80px 0;
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
  font-size: 15px;
  line-height: 20px;
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

const BottomCol = ({ buttonType, loading, buttonText, disabled }) => {
  return (
    <BottomWarrper>
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
};

export default BottomCol;
