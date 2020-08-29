import styled from 'styled-components';
import { pallete } from '../../lib/style/pallete';

const CompleteButton = styled.button`
  border: none;
  outline: none;
  background: none;

  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;

  color: ${({ done }) => (done ? pallete.gray[6] : pallete.gray[3])};
`;

export default CompleteButton;
