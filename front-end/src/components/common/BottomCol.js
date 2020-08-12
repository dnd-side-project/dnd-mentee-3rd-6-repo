import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { pallete } from '../../lib/style/pallete';

const ButtonWarrper = styled(Button)`
  width: 100%;
  height: 100%;
  color: black;
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

const Bottom = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-content: center;
`;

const BottomCol = ({ bottomText, buttonType, loading }) => {
  return (
    <Bottom>
      <ButtonWarrper type="primary" size="large" htmlType={buttonType} loading={loading}>
        {bottomText}
      </ButtonWarrper>
    </Bottom>
  );
};

export default BottomCol;
