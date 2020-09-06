import styled, { css } from 'styled-components';
import { pallete } from '../../lib/style/pallete';

const RdioWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 91vw;
`;

export const RadioButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 17px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: center;

  width: ${({ width }) => width || '165px'};
  height: 40px;

  outline: none;
  background: none;

  color: ${pallete.gray[3]};

  border: 1px solid ${pallete.gray[3]};
  border-radius: 14px;

  ${({ value, catNeutralized }) => {
    return value === catNeutralized
      ? css`
          border: 1px solid ${pallete.secondary[2]};
          color: ${pallete.primary[1]};
        `
      : css`
          border: 1px solid ${pallete.gray[3]};
        `;
  }}
`;

export default RdioWrapper;
