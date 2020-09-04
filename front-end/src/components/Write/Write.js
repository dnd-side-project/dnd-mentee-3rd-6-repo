import React from 'react';
import PropTypes from 'prop-types';

import {
  WriteForm,
  ImageBox,
  TextArea,
  WriteTag,
  Image,
  ButtonsWrapper,
  WriteWrapper,
  Tolltip,
} from './styles';
import CancelIcon from '../../lib/style/button/CancelIcon';
import BottomCol from '../common/BottomCol';
import ImageIcon from '../../lib/style/button/ImageIcon';
import VideoIcon from '../../lib/style/button/VideoIcon';
import { TagButton } from '../Feed/styles';
import { pallete } from '../../lib/style/pallete';
import FootIcon from '../../lib/style/feedIcon/FootIcon';

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
  checkId,
  onClickWriteTag,
  text,
  onChangeText,
  focus,
  onFocusText,
  click,
}) => {
  return (
    <WriteForm onFinish={onFinishFeed}>
      <WriteWrapper>
        <div>
          <WriteTag>
            <span>어떤 주제의 글인가요?</span>
            <div className="write-tag">
              <ul>
                {feedTags.map((feedTag) => (
                  <li key={feedTag.id}>
                    <TagButton
                      type="button"
                      check={feedTag.id}
                      checkId={checkId}
                      onClick={onClickWriteTag(feedTag.id)}
                    >
                      {feedTag.name}
                    </TagButton>
                  </li>
                ))}
              </ul>
            </div>
          </WriteTag>
          <TextArea
            placeholder="집사들과 나누고 싶은 말을 마음껏 적어주세요"
            value={text}
            onChange={onChangeText}
            onFocus={onFocusText}
            onBlur={onFocusText}
          />
        </div>
        <div>
          <Image>
            <ul>
              {previewPath.map((path) => (
                <ImageBox key={path.id}>
                  <button type="button" onClick={onClickClose(path.id)}>
                    <CancelIcon color={pallete.gray[6]} />
                  </button>
                  <span>
                    <img src={path.url} alt="고양이 사진" />
                  </span>
                </ImageBox>
              ))}
            </ul>
          </Image>
        </div>
      </WriteWrapper>
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
        <div>
          {click ? null : (
            <Tolltip focus={focus}>
              <p>
                <span>냥이를 자랑해주라냥</span>
                <FootIcon />
              </p>
              <span className="arrow" />
            </Tolltip>
          )}
          <button className="input-btn" type="button" onClick={onClickImage}>
            <ImageIcon />
          </button>
          <button className="input-btn" type="button" onClick={onClickVideo}>
            <VideoIcon />
          </button>
        </div>
        <BottomCol
          top="5vh"
          bottom="5vh"
          buttonType="submit"
          loading={false}
          buttonText="다음 단계로"
          disabled={!text}
        />
      </ButtonsWrapper>
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
  checkId: PropTypes.number.isRequired,
  onClickWriteTag: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  onFocusText: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
};

export default Write;
