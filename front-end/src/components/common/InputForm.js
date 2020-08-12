import styled from 'styled-components';
import { Input } from 'antd';
import { pallete } from '../../lib/style/pallete';

const InputForm = styled(Input)`
  background: ${pallete.gray};
  height: 50px;

  &::placeholder {
    color: black;
  }
`;

export default InputForm;
