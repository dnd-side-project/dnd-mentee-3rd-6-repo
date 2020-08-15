import styled from 'styled-components';
import { pallete } from '../../lib/style/pallete';

const ErrorMessage = styled.p`
  color: ${pallete.red};
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  margin-top: 10px;
`;

export default ErrorMessage;
