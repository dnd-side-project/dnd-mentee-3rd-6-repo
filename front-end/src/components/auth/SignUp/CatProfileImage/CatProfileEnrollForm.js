import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import { EnrollImageBox, CatKindModal, ScrollStop, CheckButton } from './styles';
import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';
import RdioWrapper, { RadioButton } from '../../../common/RdioForm';
import DropDownIcon from '../../../../lib/style/button/DropDownIcon';

const CatProfileEnrollForm = ({
  catName,
  catFeatures,
  previewPath,
  onSelectCatKindId,
  selectCheck,
  CatKindId,
  catKindCheck,
  onClickCatKindCheck,
  currentDay,
  catBirthday,
  catWeight,
  onChangeCatWeight,
  catGender,
  onClcikCatGender,
  onChangeCatBirthday,
  catNeutralized,
  onClickCatNeutralized,
  onSubmitSignUp,
}) => {
  return (
    <>
      <ScrollStop selectCheck={selectCheck} />
      <Form onFinish={onSubmitSignUp}>
        <Margin top="30px">
          <EnrollImageBox>
            <div className="img-wrapper">
              {previewPath && <img src={previewPath} alt="고양이 사진" />}
            </div>
            <dl className="info-wrapper">
              <dt>{catName} 이름</dt>
              <dd>{catFeatures} 특징</dd>
            </dl>
          </EnrollImageBox>
          <InputWrapper top="0px" flexRow>
            <label htmlFor="catKind">품종</label>
            <InputForm
              addonAfter={
                <p>
                  <DropDownIcon />
                </p>
              }
              flex={0.95}
              type="text"
              name="catKind"
              placeholder="냥이의 품종을 알려주세요"
              value={catKindCheck && CatKindId[catKindCheck - 1].name}
              onFocus={onSelectCatKindId}
              width="75vw"
              top="0px"
              readOnly
              required
            />
          </InputWrapper>
          <InputWrapper top="35px" flexRow>
            <label htmlFor="catBirthday">생일</label>
            <InputForm
              name="catBirthday"
              type="date"
              data-placeholder="냥이가 언제 태어났는지 궁금해요"
              min="2000-01-01"
              max={currentDay}
              value={catBirthday}
              onChange={onChangeCatBirthday}
              width="75vw"
              top="0px"
              required
            />
          </InputWrapper>
          <InputWrapper top="35px" flexRow>
            <label htmlFor="catWeight">몸무게</label>
            <InputForm
              addonAfter={<p>kg</p>}
              flex={0.94}
              type="number"
              name="catWeight"
              placeholder="몸무게를 알려주세요"
              value={catWeight} // 최대 입력 범위 지정해야 함
              onChange={onChangeCatWeight}
              width="75vw"
              top="0px"
              color
              required
            />
          </InputWrapper>
          <InputWrapper top="25px">
            <div>
              <label htmlFor="catGender">성별</label>
              <br />
              <RdioWrapper name="catGender">
                <RadioButton
                  type="button"
                  value="MALE"
                  catNeutralized={catGender}
                  onClick={onClcikCatGender}
                >
                  남자냥
                </RadioButton>
                <RadioButton
                  type="button"
                  value="FEMALE"
                  catNeutralized={catGender}
                  onClick={onClcikCatGender}
                >
                  여자냥
                </RadioButton>
              </RdioWrapper>
            </div>
          </InputWrapper>
          <InputWrapper top="25px">
            <div>
              <label htmlFor="catNeutralized">중성화 유무</label>
              <br />
              <RdioWrapper name="catNeutralized">
                <RadioButton
                  type="button"
                  value="TRUE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                  width="109px"
                >
                  했어요
                </RadioButton>
                <RadioButton
                  type="button"
                  value="FALSE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                  width="109px"
                >
                  안했어요
                </RadioButton>
                <RadioButton
                  type="button"
                  value="NONE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                  width="109px"
                >
                  잘모르겠어요
                </RadioButton>
              </RdioWrapper>
            </div>
          </InputWrapper>
        </Margin>
        <BottomCol top="7vh" bottom="10px" buttonType="submit" buttonText="다음 단계로" />
      </Form>
      {selectCheck && (
        <CatKindModal>
          <div className="modal-wrapper">
            <ul>
              {CatKindId.map((v) => (
                <li key={v.id}>
                  <CheckButton
                    type="button"
                    checkId={v.id}
                    catKindCheck={catKindCheck}
                    onClick={onClickCatKindCheck(v.id)}
                  >
                    {v.name}
                  </CheckButton>
                </li>
              ))}
            </ul>
            <button className="modal-btn" type="button" onClick={onSelectCatKindId}>
              확인
            </button>
          </div>
        </CatKindModal>
      )}
    </>
  );
};

CatProfileEnrollForm.prototype = {
  catName: PropTypes.string.isRequired,
  catFeatures: PropTypes.string.isRequired,
  previewPath: PropTypes.string.isRequired,
  onSelectCatKindId: PropTypes.func.isRequired,
  selectCheck: PropTypes.bool.isRequired,
  CatKindId: PropTypes.object.isRequired,
  catKindCheck: PropTypes.number.isRequired,
  onClickCatKindCheck: PropTypes.func.isRequired,
  currentDay: PropTypes.string.isRequired,
  catBirthday: PropTypes.string.isRequired,
  catGender: PropTypes.string.isRequired,
  onClcikCatGender: PropTypes.func.isRequired,
  onChangeCatBirthday: PropTypes.func.isRequired,
  catNeutralized: PropTypes.string.isRequired,
  onClickCatNeutralized: PropTypes.func.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(CatProfileEnrollForm);
