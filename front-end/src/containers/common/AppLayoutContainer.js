import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import Applayout from '../../components/common/AppLayout';
import { GO_TO_PAGE } from '../../modules/goToPage';

const AppLayoutContainer = ({ children, title }) => {
  const dispatch = useDispatch();
  const { pageURL } = useSelector((state) => state.goToPage);

  const onClickMenu = useCallback(
    (e) => {
      if (pageURL !== e.target.value) {
        return dispatch({
          type: GO_TO_PAGE,
          data: e.target.value,
        });
      }
    },
    [dispatch, pageURL],
  );

  return (
    <Applayout children={children} title={title} pageURL={pageURL} onClickMenu={onClickMenu} />
  );
};

AppLayoutContainer.prototype = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default AppLayoutContainer;
