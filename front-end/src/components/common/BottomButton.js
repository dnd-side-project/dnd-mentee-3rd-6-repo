import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const ButtonWarrper = styled(Button)`
  width: 100%;
  height: 50px;
  background: ${pallete.orange};
  border: none;

  &:hover {
    background: ${pallete.orange};
    border: 1px solid ${pallete.orange};
  }

  &:active {
    background: ${darken(0.1, pallete.orange)};
    border: 1px solid ${pallete.orange};
  }

  &:focus {
    background: ${lighten(0.1, pallete.orange)};
    border: 1px solid ${pallete.orange};
  }
`;

const BottomButton = ({ text, buttonType, loading }) => {
  return (
    <ButtonWarrper
      type="primary"
      size="large"
      htmlType={buttonType}
      loading={loading}
    >
      {text}
    </ButtonWarrper>
  );
};

BottomButton.prototype = {
  text: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default BottomButton;
