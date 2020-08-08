import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';

const GoBackButton = styled(Button)`
  padding: 0;
  width: 24px;
  height: 24px;
  font-size: 24px;
  span {
    width: auto;
    color: ${pallete.orange};
  }
`;

const BackButton = ({ history }) => {
  const onGoBack = () => {
    history.goBack();
  };
  return (
    <>
      <GoBackButton type="link" size="small" onClick={onGoBack}>
        <LeftOutlined />
      </GoBackButton>
    </>
  );
};

BackButton.prototype = {
  history: PropTypes.object.isRequired,
};

export default withRouter(BackButton);
