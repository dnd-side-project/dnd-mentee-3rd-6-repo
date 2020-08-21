import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../common/InputForm';
import { EnrollImageBox } from './ImageStyles';
import BottomCol from '../../common/BottomCol';

const ProfileName = ({
  catName,
  onChangeCatName,
  character,
  onChangeCharacter,
  onSubmitImage,
  previewPath,
  uploadImageDone,
}) => {
  return (
    <Form onFinish={onSubmitImage} encType="multipart/form-data">
      <EnrollImageBox>{previewPath && <img src={previewPath} alt="고양이 사진" />}</EnrollImageBox>
      <InputWrapper>
        <div>
        <label>품종</label>
        <InputForm
          // addonBefore="1/10"
          type="text"
          maxLength={15}
          value={catName}
          onChange={onChangeCatName}
          placeholder="냥이의 품종을 알려주세요."
          required
        />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div>
        <label>성별</label>
        <InputForm
          // addonBefore="1/20"
          type="text"
          value={character}
          onChange={onChangeCharacter}
          placeholder="냥이만의 특징이 있나요? 간단하게 소개 해주세요 :)"
          bordered={false}
          required
        />
        <div></div></div>
      </InputWrapper>
      <InputWrapper>
        <div>
        <label>생일</label>
        <InputForm
          // addonBefore="1/10"
          type="text"
          maxLength={15}
          value={catName}
          onChange={onChangeCatName}
          placeholder="냥이 이름을 알려주세요"
          required
        />
        </div>
      </InputWrapper>
      <InputWrapper>
        <div>
        <label>중성화 유무</label>
        <InputForm
          // addonBefore="1/10"
          type="text"
          maxLength={15}
          value={catName}
          onChange={onChangeCatName}
          placeholder="냥이 이름을 알려주세요"
          required
        />
         </div>
      </InputWrapper>
      <BottomCol
        buttonType="submit"
        loading={uploadImageDone}
        buttonText="다음 단계로"
        disabled={!(catName && character)}
      />
    </Form>
  );
};

ProfileName.prototype = {
  catName: PropTypes.string.isRequired,
  onChangeCatName: PropTypes.func.isRequired,
  character: PropTypes.string.isRequired,
  onChangeCharacter: PropTypes.func.isRequired,
  uploadImageDone: PropTypes.bool.isRequired,
};

export default ProfileName;
