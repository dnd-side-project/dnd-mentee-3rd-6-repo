import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { pallete } from '../../lib/style/pallete';
import { PREV_PAGE } from '../../modules/pageNumber';

const GoBackButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 25px;
  padding: 5px 0px;

  img {
    color: ${pallete.gray[6]};
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
        <img src="/images/button/back.svg" alt="뒤로가기" />
      </GoBackButton>
    </>
  );
};

BackButton.prototype = {
  history: PropTypes.object.isRequired,
};

export default withRouter(BackButton);
