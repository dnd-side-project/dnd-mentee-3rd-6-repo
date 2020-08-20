import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import BottomCol from '../../common/BottomCol';
import ProfileImageWrapper, { ImageBox, ProfileHeader, Imagebutton } from './ImageStyles';

const ProfileImageUpload = ({
  imageInputRef,
  onClickImageUpload,
  onChangeImage,
  prevImagePath,
  onNextProfilePage,
}) => {
  return (
    <Form onFinish={onNextProfilePage}>
      <ProfileImageWrapper>
        <div>
          <ProfileHeader>
            <strong>냥이의 사진</strong>을 등록해주세요
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
        <ImageBox>
          {prevImagePath.previewPath && <img src={prevImagePath.previewPath} alt="고양이 사진" />}
        </ImageBox>
        <Imagebutton type="button" onClick={onClickImageUpload}>
          <PlusOutlined />
        </Imagebutton>
        <div>
          <p>
            가입 후 마이페이지에서 냥이 사진 변경과 <br /> 냥이 추가가 가능하니 부담없이 골라주세요
            :)
          </p>
        </div>
        <BottomCol
          buttonType="submit"
          buttonText="사진 선택 완료"
          disabled={!prevImagePath.previewPath}
        />
      </ProfileImageWrapper>
    </Form>
  );
};

ProfileImageUpload.prototype = {
  imageInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onClickImageUpload: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  prevImagePath: PropTypes.object.isRequired,
  onNextProfilePage: PropTypes.func.isRequired,
};

export default ProfileImageUpload;
