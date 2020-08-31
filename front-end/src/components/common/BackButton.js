import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PREV_PAGE, NOT_SERVANT_PREV_PAGE } from '../../modules/auth';
import BackIcon from '../../lib/style/button/BackIcon';
import { PREV_FEED_PAGE } from '../../modules/feed';

const GoBackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;

  padding: 0;

  border: none;
  outline: none;
  background: none;
`;

const BackButton = ({ history, page }) => {
  // 회원가입 1, 피드 2, 글쓰기 3,
  const dispatch = useDispatch();
  const { pageIndex: registerIndex, isServant } = useSelector((state) => state.auth);
  const { titleIndex: feedIndex } = useSelector((state) => state.feed);

  /* 1. 회원가입 */
  const onClickRegister = useCallback(() => {
    if (registerIndex <= 1) {
      return history.goBack();
    }
    if (!isServant && registerIndex === 7) {
      return dispatch({
        type: NOT_SERVANT_PREV_PAGE,
      });
    }
    dispatch({
      type: PREV_PAGE,
    });
  }, [dispatch, history, isServant, registerIndex]);

  /* 2. 피드 */
  const onClickFeed = useCallback(() => {
    if (feedIndex) {
      dispatch({
        type: PREV_FEED_PAGE,
        data: feedIndex,
      });
    }
  }, [dispatch, feedIndex]);

  /* 글쓰기 */
  const onClickWrite = useCallback(() => {
    return history.goBack('/feed');
  }, [history]);

  /* 모아주기 */
  const stepButtons = [onClickRegister, onClickFeed, onClickWrite];
  const currentStepButtons = () => stepButtons[page - 1];

  return (
    <>
      <GoBackButton type="button" onClick={currentStepButtons()}>
        <BackIcon />
      </GoBackButton>
    </>
  );
};

BackButton.prototype = {
  history: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
};

export default withRouter(BackButton);
