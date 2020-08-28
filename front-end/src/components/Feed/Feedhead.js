import React from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderButton } from './styles';

const Feedhead = ({ titleIndex, onClickHometown, onClickAll, onClickMyFriend }) => {
  return (
    <Header>
      <ul className="feed-head__title">
        <li>
          <HeaderButton type="button" value={1} titleIndex={titleIndex} onClick={onClickHometown}>
            우리동네
          </HeaderButton>
        </li>
        <li>
          <HeaderButton type="button" value={2} titleIndex={titleIndex} onClick={onClickAll}>
            전체
          </HeaderButton>
        </li>
        <li>
          <HeaderButton type="button" value={3} titleIndex={titleIndex} onClick={onClickMyFriend}>
            내 친구
          </HeaderButton>
        </li>
      </ul>
      <div className="feed-head__tag">
        <ul>
          <li>
            <button type="button">#일상</button>
          </li>
          <li>
            <button type="button">#나눔</button>
          </li>
          <li>
            <button type="button">#구조</button>
          </li>
          <li>
            <button type="button">#탁묘</button>
          </li>
          <li>
            <button type="button">#냥이 찾아요</button>
          </li>
        </ul>
      </div>
    </Header>
  );
};

Feedhead.prototype = {
  titleIndex: PropTypes.number.isRequired,
  onClickHometown: PropTypes.func.isRequired,
  onClickAll: PropTypes.func.isRequired,
  onClickMyFriend: PropTypes.func.isRequired,
};

export default Feedhead;
