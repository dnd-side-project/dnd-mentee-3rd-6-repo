import React from 'react';
import { WriteForm, ImageBox, TextArea, WriteTag, Image, ButtonsWrapper } from './styles';
import CancelIcon from '../../lib/style/button/CancelIcon';
import BottomCol from '../common/BottomCol';
import ImageIcon from '../../lib/style/button/ImageIcon';
import VideoIcon from '../../lib/style/button/VideoIcon';

const Write = () => {
  return (
    <WriteForm>
      <div>
        <WriteTag>
          <span>어떤 주제의 글인가요?</span>
          <div className="write-tag">
            <ul>
              <li>
                <button type="button">#일상</button>
              </li>
              <li>
                <button type="button">#나눔</button>
              </li>
              <li>
                <button type="button">#구조</button>
              </li>
              <li>
                <button type="button">#탁묘</button>
              </li>
              <li>
                <button type="button">#냥이 찾아요</button>
              </li>
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
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
            <ImageBox>
              <button type="button">
                <CancelIcon />
              </button>
              <span>
                <img
                  src="https://pds.joins.com/news/component/htmlphoto_mmdata/201904/08/1d956ae6-eb9c-4a04-8f1f-d1a9e719cde5.jpg"
                  alt=""
                />
              </span>
            </ImageBox>
          </ul>
        </Image>
      </div>
      <div>
        <ButtonsWrapper>
          <button type="button">
            <ImageIcon />
          </button>
          <button type="button">
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

export default Write;
