import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import { PrevImageBox, ProfileHeader } from './styles';
import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';

const CatProfileNameForm = ({
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
      <Margin top="94px" bottom="71px">
        <ProfileHeader>
          <strong>냥이의 이름</strong>이 궁금해요
        </ProfileHeader>
        <PrevImageBox>{previewPath && <img src={previewPath} alt="고양이 사진" />}</PrevImageBox>
        <InputWrapper>
          <InputForm
            addonAfter="1/10"
            type="text"
            maxLength={15}
            value={catName}
            onChange={onChangeCatName}
            placeholder="냥이 이름을 알려주세요"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <div>
            <InputForm
              addonAfter="1/20"
              type="text"
              value={character}
              onChange={onChangeCharacter}
              placeholder="냥이만의 특징이 있나요? 간단하게 소개 해주세요 :)"
              bordered={false}
              required
            />
            <p style={{ marginTop: 10 }}>ex) 똥꼬발랄 개냥이, 냔냥펀치의 날인</p>
          </div>
        </InputWrapper>
      </Margin>
      <BottomCol
        buttonType="submit"
        loading={uploadImageDone}
        buttonText="다음 단계로"
        disabled={!(catName && character)}
      />
    </Form>
  );
};

CatProfileNameForm.prototype = {
  catName: PropTypes.string.isRequired,
  onChangeCatName: PropTypes.func.isRequired,
  character: PropTypes.string.isRequired,
  onChangeCharacter: PropTypes.func.isRequired,
  previewPath: PropTypes.string.isRequired,
  uploadImageDone: PropTypes.bool.isRequired,
};

export default CatProfileNameForm;
