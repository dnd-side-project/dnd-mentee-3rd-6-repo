import styled from 'styled-components';
import { Form } from 'antd';

const FormWrapper = styled(Form)`
  .input-wrapper {
    margin-bottom: 50px;
  }

  .input-wrapper:first-child {
    margin-top: 40px;
  }

  .input-wrapper:last-child {
    margin-bottom: 0;
  }
`;

export default FormWrapper;
