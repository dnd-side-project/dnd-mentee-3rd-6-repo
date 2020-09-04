import React from 'react';
import PropTypes from 'prop-types';

import {
  CatTagWrapper,
  WriteForm,
  CatTagHeader,
  CatTagList,
  CatTagItem,
  CatTagTooltip,
} from './styles';
import HighLight from '../common/HighLight';
import BottomCol from '../common/BottomCol';
import SmallCheckIcon from '../../lib/style/SmallCheckIcon';

const WriteCatTag = ({ check, onClickCheck }) => {
  return (
    <>
      <WriteForm>
        <CatTagWrapper>
          <CatTagHeader>
            <h1>
              <HighLight line="132px">
                함께한 냥이가 <spna className="line" />
              </HighLight>
              <br /> 있다면 태그해주세요
            </h1>
          </CatTagHeader>
          {/* 마이페이지 완료되면 map 사용 */}
          <CatTagList>
            <ul>
              <CatTagItem checkId={1} check={check} onClick={onClickCheck(1)}>
                <button type="button">
                  <span className="img-box">
                    <img
                      src="https://miro.medium.com/max/8064/1*K7Vst-NDyW7HGbWj_9L7Lg.jpeg"
                      alt=""
                    />
                  </span>
                  {check === 1 && (
                    <span className="check">
                      <SmallCheckIcon />
                    </span>
                  )}
                </button>
                <p>이름</p>
              </CatTagItem>
              <CatTagItem checkId={2} check={check} onClick={onClickCheck(2)}>
                <button type="button">
                  <span className="img-box">
                    <img
                      src="https://miro.medium.com/max/8064/1*K7Vst-NDyW7HGbWj_9L7Lg.jpeg"
                      alt=""
                    />
                  </span>
                  {check === 2 && (
                    <span className="check">
                      <SmallCheckIcon />
                    </span>
                  )}
                </button>
                <p>이름</p>
              </CatTagItem>
              <CatTagItem checkId={3} check={check} onClick={onClickCheck(3)}>
                <button type="button">
                  <span className="img-box">
                    <img
                      src="https://miro.medium.com/max/8064/1*K7Vst-NDyW7HGbWj_9L7Lg.jpeg"
                      alt=""
                    />
                  </span>
                  {check === 3 && (
                    <span className="check">
                      <SmallCheckIcon />
                    </span>
                  )}
                </button>
                <p>이름</p>
              </CatTagItem>
            </ul>
          </CatTagList>
        </CatTagWrapper>
        <CatTagTooltip>
          <p>우리 냥이가 안나온 사진이라면?</p>
          <span className="arrow" />
        </CatTagTooltip>
        <div>
          <BottomCol
            top="3.7vh"
            bottom="5vh"
            buttonType="submit"
            loading={false}
            buttonText="게시글 작성 완료"
          />
        </div>
      </WriteForm>
    </>
  );
};

WriteCatTag.prototype = {
  check: PropTypes.number.isRequired,
  onClickCheck: PropTypes.bool.isRequired,
};

export default WriteCatTag;
