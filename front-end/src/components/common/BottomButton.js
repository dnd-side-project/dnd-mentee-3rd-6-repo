import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { pallete } from '../../lib/style/pallete';

const ButtonWarrper = styled(Button)`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background: ${pallete.orange};
  border: 1px solid #fc8210;

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

const BottomButton = ({ text, buttonType }) => {
  return (
    <ButtonWarrper type="primary" size="block" htmlType={buttonType}>
      {text}
    </ButtonWarrper>
  );
};

export default BottomButton;
