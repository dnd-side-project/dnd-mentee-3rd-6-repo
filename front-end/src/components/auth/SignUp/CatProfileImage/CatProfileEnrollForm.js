import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import InputWrapper, { InputForm } from '../../../common/InputForm';
import { EnrollImageBox, CatKindModal, ScrollStop, CheckButton } from './styles';
import BottomCol from '../../../common/BottomCol';
import Margin from '../../../common/Margin';
import RdioWrapper, { RadioButton } from '../../../common/RdioForm';

const CatProfileEnrollForm = ({
  catName,
  previewPath,
  onSelectCatKindId,
  selectCheck,
  CatKindId,
  catKindCheck,
  onClickCatKindCheck,
  catGender,
  onClcikCatGender,
  currentDay,
  catBirthday,
  onChangeCatBirthday,
  catNeutralized,
  onClickCatNeutralized,
  onSubmitSignUp,
}) => {
  return (
    <>
      <ScrollStop selectCheck={selectCheck} />
      <Form onFinish={onSubmitSignUp}>
        <Margin top="34px" bottom="70px">
          <EnrollImageBox>
            <span>{previewPath && <img src={previewPath} alt="고양이 사진" />}</span>
            <p>{catName} (고양이 이름 나오는 공간)</p>
          </EnrollImageBox>
          <InputWrapper>
            <div>
              <label htmlFor="catKind">품종</label>
              <br />
              <InputForm
                // addonAfter="dd"
                name="catKind"
                placeholder="냥이의 품종을 알려주세요"
                value={catKindCheck && CatKindId[catKindCheck - 1].name}
                onFocus={onSelectCatKindId}
                readOnly
                required
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <div>
              <label htmlFor="catGender">성별</label>
              <br />
              {catGender}
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
          <InputWrapper>
            <div>
              <label htmlFor="catBirthday">생일</label>
              <br />
              <InputForm
                name="catBirthday"
                type="date"
                min="2000-01-01"
                max={currentDay}
                value={catBirthday}
                onChange={onChangeCatBirthday}
                required
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <div>
              <label htmlFor="catNeutralized">중성화 유무</label>
              <br />
              <RdioWrapper name="catNeutralized">
                <RadioButton
                  type="button"
                  value="TRUE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                >
                  했어요
                </RadioButton>
                <RadioButton
                  type="button"
                  value="FALSE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                >
                  안했어요
                </RadioButton>
                <RadioButton
                  type="button"
                  value="NONE"
                  catNeutralized={catNeutralized}
                  onClick={onClickCatNeutralized}
                >
                  잘모르겠어요
                </RadioButton>
              </RdioWrapper>
            </div>
          </InputWrapper>
        </Margin>
        <BottomCol
          buttonType="submit"
          // loading={uploadImageDone}
          buttonText="다음 단계로"
        />
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
  previewPath: PropTypes.string.isRequired,
  onSelectCatKindId: PropTypes.func.isRequired,
  selectCheck: PropTypes.bool.isRequired,
  CatKindId: PropTypes.object.isRequired,
  catKindCheck: PropTypes.number.isRequired,
  onClickCatKindCheck: PropTypes.func.isRequired,
  catGender: PropTypes.string.isRequired,
  onClcikCatGender: PropTypes.func.isRequired,
  currentDay: PropTypes.string.isRequired,
  catBirthday: PropTypes.string.isRequired,
  onChangeCatBirthday: PropTypes.func.isRequired,
  catNeutralized: PropTypes.string.isRequired,
  onClickCatNeutralized: PropTypes.func.isRequired,
  onSubmitSignUp: PropTypes.func.isRequired,
};

export default React.memo(CatProfileEnrollForm);
