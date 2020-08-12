import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';
import { PREV_PAGE } from '../../modules/pageNumber';

const GoBackButton = styled(Button)`
  padding: 0;
  margin-top: 10px;
  width: 24px;
  height: auto;
  font-size: 24px;
  span {
    width: 24px;
    color: ${pallete.orange};
  }
`;

const BackButton = ({ history }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.pageNumber);

  const onGoBack = () => {
    if (page <= 1) {
      return history.goBack();
    }
    dispatch({
      type: PREV_PAGE,
    });
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
