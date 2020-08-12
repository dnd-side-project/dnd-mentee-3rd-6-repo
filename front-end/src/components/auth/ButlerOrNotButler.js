import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio } from 'antd';

import BottomCol from '../common/BottomCol';

const CenterLayout = styled.div`
  margin-top: 200px;
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      display: flex;
      justify-content: center;
      width: 90%;
      height: 50px;
      margin: 0 auto;

      border-radius: 20px;
      border: 1px solid inherit;

      span {
        margin: auto 0;
      }
    }

    label:last-child {
      margin-top: 21px;

      &::before {
        content: none;
      }
    }
  }
`;

const ButlerOrNotButler = ({ bottomText }) => {
  return (
    <>
      <CenterLayout>
        <Radio.Group defaultValue="butler" size="large">
          <Radio.Button value="butler">집사에요</Radio.Button>
          <Radio.Button value="notButler">랜선집사에요</Radio.Button>
        </Radio.Group>
      </CenterLayout>
      <BottomCol bottomText={bottomText} buttonType="submit" />
    </>
  );
};

ButlerOrNotButler.prototype = {
  bottomText: PropTypes.string.isRequired,
};

export default ButlerOrNotButler;
