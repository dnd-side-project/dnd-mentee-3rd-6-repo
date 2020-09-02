import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import BottomCol from '../../../common/BottomCol';
import ProfileImageWrapper, { ImageBox, ProfileHeader, Imagebutton } from './styles';
import Margin from '../../../common/Margin';
import HighLight from '../../../common/HighLight';

const CatProfileImageForm = ({
  imageInputRef,
  onClickImageUpload,
  onChangeImage,
  prevImagePath,
  onSubmitSignUp,
}) => {
  return (
    <Form onFinish={onSubmitSignUp}>
      <Margin top="10vh">
        <ProfileImageWrapper>
          <div>
            <ProfileHeader>
              <HighLight line="163px">
                우리 냥이의 사진
                <span className="line" />
              </HighLight>
              을 <br /> 등록해주세요
            </ProfileHeader>
          </div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            name="catProfileImg"
            hidden
            ref={imageInputRef}
            onChange={onChangeImage}
          />
          <div className="second">
            <ImageBox>
              {prevImagePath.previewPath && (
                <img src={prevImagePath.previewPath} alt="고양이 사진" />
              )}
            </ImageBox>
            <Imagebutton type="button" onClick={onClickImageUpload}>
              <PlusOutlined />
            </Imagebutton>
          </div>
          <div>
            <p>
              가입 후 마이페이지에서 냥이 사진 변경과 <br /> 냥이 추가가 가능하니 부담없이
              골라주세요 :)
            </p>
          </div>
        </ProfileImageWrapper>
      </Margin>
      <BottomCol
        top="14.5vh"
        bottom="10px"
        buttonType="submit"
        buttonText="사진 선택 완료"
        disabled={!prevImagePath.previewPath}
      />
    </Form>
  );
};

CatProfileImageForm.prototype = {
  imageInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onClickImageUpload: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  prevImagePath: PropTypes.object.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default CatProfileImageForm;
