import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PREV_PAGE, NOT_SERVANT_PREV_PAGE } from '../../modules/auth';
import BackIcon from '../../lib/style/button/BackIcon';
import { PREV_FEED_PAGE } from '../../modules/feed';
import { PREV_WRITE_PAGE } from '../../modules/write';

const GoBackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;

  padding: 0;
  padding-bottom: 3px;

  border: none;
  outline: none;
  background: none;
`;

const BackButton = ({ history, page }) => {
  // 회원가입 1, 피드 2, 글쓰기 3,
  const dispatch = useDispatch();
  const { pageIndex: registerIndex, isServant } = useSelector((state) => state.auth);
  const { filterIndex: feedIndex } = useSelector((state) => state.feed);
  const { pageIndex: writeIndex } = useSelector((state) => state.write);

  /* 1. 회원가입 */
  const onClickRegister = useCallback(() => {
    if (registerIndex <= 1) {
      return history.push('/');
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
    dispatch({
      type: PREV_FEED_PAGE,
      data: feedIndex,
    });
  }, [dispatch, feedIndex]);

  /* 3. 글쓰기 */
  const onClickWrite = useCallback(() => {
    if (writeIndex <= 1) {
      return history.push('/feed');
    }

    return dispatch({
      type: PREV_WRITE_PAGE,
    });
  }, [dispatch, history, writeIndex]);

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
