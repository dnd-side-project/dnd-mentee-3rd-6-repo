import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CancelIcon from '../../lib/style/button/CancelIcon';
import { pallete } from '../../lib/style/pallete';

const Button = styled.button`
  border: none;
  background: none;
  outline: none;

  padding: 0;

  height: 18px;
`;

const CloseButton = ({ onClickReset, index }) => {
  return (
    <Button type="button" onClick={onClickReset(index)}>
      <CancelIcon color={pallete.gray[3]} />
    </Button>
  );
};

CloseButton.prototype = {
  index: PropTypes.number.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default CloseButton;
