import React from 'react';
import PropTypes from 'prop-types';

import InputWrapper, { Textarea, InputForm } from '../../common/InputForm';

const ProfileName = ({ catName, onChangeCatName, character, onChangeCharacter }) => {
  return (
    <>
      <InputWrapper>
        <InputForm
          addonBefore="1/10"
          type="text"
          maxLength={15}
          value={catName}
          onChange={onChangeCatName}
          placeholder="냥이 이름을 알려주세요"
          required
        />
      </InputWrapper>
      <InputWrapper>
        <Textarea
          addonBefore="1/20"
          value={character}
          onChange={onChangeCharacter}
          placeholder="냥이만의 특징이 있나요? 간단하게 소개 해주세요 :)&#13;&#10;
        ex) 스트릿 출신이라 냥냥펀치가 매우 아파요"
          bordered={false}
          required
        />
      </InputWrapper>
    </>
  );
};

ProfileName.prototype = {
  catName: PropTypes.string.isRequired,
  onChangeCatName: PropTypes.func.isRequired,
  character: PropTypes.string.isRequired,
  onChangeCharacter: PropTypes.func.isRequired,
};

export default ProfileName;
