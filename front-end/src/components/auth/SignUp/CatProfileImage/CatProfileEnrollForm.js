import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import { EnrollImageBox } from './styles';
import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';

const CatProfileEnrollForm = ({ catName, previewPath }) => {
  return (
    <Form>
      <Margin top="34px" bottom="70px">
        <EnrollImageBox>
          {previewPath && <img src={previewPath} alt="고양이 사진" />}
        </EnrollImageBox>
        <InputWrapper>
          <div>
            <label>품종</label>
            <InputForm type="text" required />
          </div>
        </InputWrapper>
        <InputWrapper>
          <div>
            <label>성별</label>
            <InputForm type="text" required />
            <div />
          </div>
        </InputWrapper>
        <InputWrapper>
          <div>
            <label>생일</label>
            <InputForm type="text" required />
          </div>
        </InputWrapper>
        <InputWrapper>
          <div>
            <label>중성화 유무</label>
            <InputForm type="text" required />
          </div>
        </InputWrapper>
      </Margin>
      <BottomCol
        buttonType="submit"
        // loading={uploadImageDone}
        buttonText="다음 단계로"
        // disabled={!(catName && character)}
      />
    </Form>
  );
};

CatProfileEnrollForm.prototype = {
  catName: PropTypes.string.isRequired,
  previewPath: PropTypes.string.isRequired,
};

export default CatProfileEnrollForm;
