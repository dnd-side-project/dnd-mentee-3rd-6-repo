import styled from 'styled-components';
import { Form } from 'antd';

export const FormWrapper = styled(Form)`
  .input-wrapper {
    margin-top: 20px;
  }

  .input-wrapper:nth-child(1) {
    margin-top: 0;
  }

  span {
    border-radius: 15px;
  }

  input {
    border-radius: 15px;
  }
`;
