import styled, { css } from 'styled-components';
import { pallete } from '../../lib/style/pallete';

const RdioWrapper = styled.div`
  width: 343px;
  margin-top: 31px;

  display: flex;
  justify-content: space-between;
`;

export const RadioButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: center;

  min-width: 98px;
  border: none;
  outline: none;
  background: none;

  border: 1px solid ${pallete.gray[3]};

  ${({ value, catNeutralized }) => {
    return value === catNeutralized
      ? css`
          background: red;
        `
      : css`
          background: white;
        `;
  }}
`;

export default RdioWrapper;
