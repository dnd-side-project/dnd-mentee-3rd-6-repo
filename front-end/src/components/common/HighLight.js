import styled from 'styled-components';
import { pallete } from '../../lib/style/pallete';

const HighLight = styled.strong`
  position: relative;
  padding: 0;

  .line {
    position: absolute;
    bottom: 4px;
    left: -3px;
    width: ${({ line }) => line};
    height: 10px;

    background: ${pallete.secondary[2]};

    z-index: -1;
  }
`;

export default HighLight;
