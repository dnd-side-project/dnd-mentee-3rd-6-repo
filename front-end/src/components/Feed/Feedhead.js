import React from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderButton } from './styles';

const FilterType = ({ filterType, titleIndex, onClickFilter }) => {
  return (
    <li>
      <HeaderButton
        type="button"
        value={filterType.id}
        titleIndex={titleIndex}
        onClick={onClickFilter(filterType.id)}
      >
        {filterType.name}
      </HeaderButton>
    </li>
  );
};

const FeedTag = ({ feedTag }) => {
  return (
    <li>
      <button type="button">{feedTag.name}</button>
    </li>
  );
};

const FeedHead = ({ filterTypes, onClickFilter, feedTags, sortTypes, titleIndex }) => {
  return (
    <Header>
      <ul className="feed-head__title">
        {filterTypes.map((filterType) => (
          <FilterType
            key={filterType.id}
            filterType={filterType}
            titleIndex={titleIndex}
            onClickFilter={onClickFilter}
          />
        ))}
      </ul>
      {titleIndex !== 3 && (
        <div className="feed-head__tag">
          <ul>
            {titleIndex === 1
              ? feedTags.map((feedTag) => <FeedTag key={feedTag.id} feedTag={feedTag} />)
              : titleIndex === 2
              ? sortTypes.map((sortType) => <FeedTag key={sortType.id} feedTag={sortType} />)
              : null}
          </ul>
        </div>
      )}
    </Header>
  );
};

FilterType.prototype = {
  filterType: PropTypes.object.isRequired,
  titleIndex: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

FeedTag.prototype = {
  feedTag: PropTypes.object.isRequired,
};

FeedHead.prototype = {
  filterTypes: PropTypes.arrayOf(PropTypes.object),
  feedTags: PropTypes.arrayOf(PropTypes.object),
  sortTypes: PropTypes.arrayOf(PropTypes.object),
  titleIndex: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

export default FeedHead;
