import React from 'react';
import PropTypes from 'prop-types';

import {
  CatTagWrapper,
  WriteForm,
  CatTagHeader,
  CatTagList,
  CatTagItem,
  CatTagTooltip,
  CatTagNullBox,
} from './styles';
import HighLight from '../common/HighLight';
import BottomCol from '../common/BottomCol';
import SmallCheckIcon from '../../lib/style/SmallCheckIcon';

const WriteCatTag = ({ cats, check, onClickCheck, onFinishAddFeed, addFeedLoading }) => {
  return (
    <>
      <WriteForm onFinish={onFinishAddFeed}>
        <CatTagWrapper>
          <CatTagHeader>
            {cats[0] ? (
              <h1>
                <HighLight line="132px">
                  함께한 냥이가 <span className="line" />
                </HighLight>
                <br /> 있다면 태그해주세요
              </h1>
            ) : (
              <h1>
                <HighLight line="65px">
                  등록된 <span className="line" />
                </HighLight>
                <br />
                냥이가 없어요 ( Ĭ ^ Ĭ )  
              </h1>
            )}
          </CatTagHeader>
          <CatTagList>
            <ul>
              {cats.map((cat) => (
                <CatTagItem
                  key={cat.id}
                  checkId={cat.id}
                  check={check.find((v) => v === cat.id)}
                  onClick={onClickCheck(cat.id)}
                >
                  <button type="button">
                    <span className="img-box">
                      <img
                        src={`${
                          process.env.NODE_ENV === 'development'
                            ? process.env.REACT_APP_BASE_URL
                            : ''
                        }${cat.profileImgUrl}`}
                        alt={cat.name}
                      />
                    </span>
                    {check.find((v) => v === cat.id) && (
                      <span className="check">
                        <SmallCheckIcon />
                      </span>
                    )}
                  </button>
                  <p>{cat.name}</p>
                </CatTagItem>
              ))}
            </ul>
          </CatTagList>
        </CatTagWrapper>
        {cats[0] ? (
          <CatTagTooltip>
            <>
              <p>우리 냥이가 안 나온 사진이라면?</p>
              <span className="arrow" />
            </>
          </CatTagTooltip>
        ) : (
          <CatTagNullBox />
        )}
        <div>
          <BottomCol
            top="3.7vh"
            bottom="5vh"
            buttonType="submit"
            loading={addFeedLoading}
            buttonText="게시글 작성 완료"
          />
        </div>
      </WriteForm>
    </>
  );
};

WriteCatTag.prototype = {
  cats: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  check: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClickCheck: PropTypes.bool.isRequired,
  onFinishAddFeed: PropTypes.func.isRequired,
  addFeedLoading: PropTypes.bool.isRequired,
};

export default React.memo(WriteCatTag);
