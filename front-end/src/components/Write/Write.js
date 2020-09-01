import React from 'react';
import PropTypes from 'prop-types';

import { WriteForm, ImageBox, TextArea, WriteTag, Image, ButtonsWrapper } from './styles';
import CancelIcon from '../../lib/style/button/CancelIcon';
import BottomCol from '../common/BottomCol';
import ImageIcon from '../../lib/style/button/ImageIcon';
import VideoIcon from '../../lib/style/button/VideoIcon';

const Write = ({
  feedTags,
  onFinishFeed,
  imageInputRef,
  videoInputRef,
  onChangeImage,
  onChangeVideo,
  onClickImage,
  onClickVideo,
  previewPath,
  onClickClose,
}) => {
  return (
    <WriteForm onFinish={onFinishFeed}>
      <div>
        <WriteTag>
          <span>어떤 주제의 글인가요?</span>
          <div className="write-tag">
            <ul>
              {feedTags.map((feedTag) => (
                <li key={feedTag.id}>
                  <button type="button">{feedTag.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </WriteTag>
      </div>
      <div>
        <TextArea placeholder="집사들과 나누고 싶은 말을 마음껏 적어주세요" />
      </div>
      <div>
        <Image>
          <ul>
            {previewPath.map((path) => (
              <ImageBox key={path.id}>
                <button type="button" onClick={onClickClose(path.id)}>
                  <CancelIcon />
                </button>
                <span>
                  <img src={path.url} alt="고양이 사진" />
                </span>
              </ImageBox>
            ))}
          </ul>
        </Image>
      </div>
      <div>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          name=""
          multiple
          hidden
          ref={imageInputRef}
          onChange={onChangeImage}
        />
        <input
          type="file"
          accept="video/*"
          name=""
          hidden
          ref={videoInputRef}
          onChange={onChangeVideo}
        />
        <ButtonsWrapper>
          <button type="button" onClick={onClickImage}>
            <ImageIcon />
          </button>
          <button type="button" onClick={onClickVideo}>
            <VideoIcon />
          </button>
        </ButtonsWrapper>
      </div>
      <div>
        <BottomCol buttonType="submit" loading={false} buttonText="다음 단계로" disabled={false} />
      </div>
    </WriteForm>
  );
};

Write.prototype = {
  feedTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFinishFeed: PropTypes.func.isRequired,
  imageInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  videoInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onChangeImage: PropTypes.func.isRequired,
  onChangeVideo: PropTypes.func.isRequired,
  onClickImage: PropTypes.func.isRequired,
  onClickVideo: PropTypes.func.isRequired,
  previewPath: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickClose: PropTypes.func.isRequired,
};

export default Write;
