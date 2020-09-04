import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import { PrevImageBox, ProfileWrapper, ProfileHeader } from './styles';
import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';
import HighLight from '../../../common/HighLight';
import { CleanMessage } from '../../../common/Message';
import { pallete } from '../../../../lib/style/pallete';

const CatProfileNameForm = ({
  catName,
  onChangeCatName,
  catFeatures,
  onChangeCatFeatures,
  previewPath,
  onSubmitSignUp,
}) => {
  return (
    <Form onFinish={onSubmitSignUp}>
      <Margin top="40px">
        <ProfileWrapper>
          <ProfileHeader>
            <HighLight line="123px">
              냥이의 이름
              <span className="line" />
            </HighLight>
            을 <br /> 등록해주세요
          </ProfileHeader>
          <PrevImageBox>{previewPath && <img src={previewPath} alt="고양이 사진" />}</PrevImageBox>
          <InputWrapper top="10px">
            <div>
              <label htmlFor="cat-name">이름</label>
              <br />
              <InputForm
                addonAfter={<p>{catName.length}/10</p>}
                addonpx="65px"
                type="text"
                name="cat-name"
                maxLength={10}
                value={catName}
                onChange={onChangeCatName}
                placeholder="냥이 이름을 알려주세요"
                width="80vw"
                top="10px"
                color={pallete.primary[1]}
                required
              />
            </div>
          </InputWrapper>
          <InputWrapper top="20px">
            <div>
              <label htmlFor="intro">한줄 소개</label>
              <br />
              <InputForm
                addonAfter={<p>{catFeatures.length}/20</p>}
                type="text"
                name="intro"
                maxLength={20}
                value={catFeatures}
                onChange={onChangeCatFeatures}
                placeholder="냥이의 특징을 한마디로 소개해주세요"
                width="80vw"
                top="10px"
                flex={0.91}
                color={pallete.primary[1]}
                required
              />
              <CleanMessage>ex) 똥꼬발랄 개냥이, 냔냥펀치의 날인</CleanMessage>
            </div>
          </InputWrapper>
        </ProfileWrapper>
      </Margin>
      <BottomCol
        top="5vh"
        bottom="5vh"
        buttonType="submit"
        buttonText="다음 단계로"
        disabled={!(catName && catFeatures)}
      />
    </Form>
  );
};

CatProfileNameForm.prototype = {
  catName: PropTypes.string.isRequired,
  onChangeCatName: PropTypes.func.isRequired,
  catFeatures: PropTypes.string.isRequired,
  onChangeCatFeatures: PropTypes.func.isRequired,
  previewPath: PropTypes.string.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default CatProfileNameForm;
