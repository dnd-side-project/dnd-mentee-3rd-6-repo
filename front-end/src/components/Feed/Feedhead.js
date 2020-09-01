import React from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderButton, TagButton } from './styles';

const FilterType = ({ filterType, checkFilterTypes, onClickFilter }) => {
  return (
    <li>
      <HeaderButton
        type="button"
        value={filterType.id}
        check={checkFilterTypes}
        onClick={onClickFilter(filterType.id)}
      >
        {filterType.name}
      </HeaderButton>
    </li>
  );
};

const FeedTag = ({ feedTag, onClickFeedTag, checkFeedTags, checkSortTypes }) => {
  return (
    <li>
      <TagButton
        type="button"
        check={checkFeedTags || checkSortTypes}
        checkId={feedTag.id}
        onClick={onClickFeedTag(feedTag.id)}
      >
        {feedTag.name}
      </TagButton>
    </li>
  );
};

const FeedHead = ({
  filterTypes,
  onClickFilter,
  feedTags,
  sortTypes,
  checkFilterTypes,
  onClickFeedTag,
  checkFeedTags,
  checkSortTypes,
}) => {
  return (
    <Header>
      <ul className="feed-head__title">
        {filterTypes.map((filterType) => (
          <FilterType
            key={filterType.id}
            filterType={filterType}
            checkFilterTypes={checkFilterTypes}
            onClickFilter={onClickFilter}
          />
        ))}
      </ul>
      {checkFilterTypes !== 3 && (
        <div className="feed-head__tag">
          <ul>
            {checkFilterTypes === 1
              ? feedTags.map((feedTag) => (
                  <FeedTag
                    key={feedTag.id}
                    checkFeedTags={checkFeedTags}
                    feedTag={feedTag}
                    onClickFeedTag={onClickFeedTag}
                  />
                ))
              : checkFilterTypes === 2
              ? sortTypes.map((sortType) => (
                  <FeedTag
                    key={sortType.id}
                    checkSortTypes={checkSortTypes}
                    feedTag={sortType}
                    onClickFeedTag={onClickFeedTag}
                  />
                ))
              : null}
          </ul>
        </div>
      )}
    </Header>
  );
};

FilterType.prototype = {
  filterType: PropTypes.object.isRequired,
  checkFilterTypes: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

FeedTag.prototype = {
  feedTag: PropTypes.object.isRequired,
  onClickFeedTag: PropTypes.func.isRequired,
  checkFeedTags: PropTypes.number.isRequired,
  checkSortTypes: PropTypes.number.isRequired,
};

FeedHead.prototype = {
  filterTypes: PropTypes.arrayOf(PropTypes.object),
  feedTags: PropTypes.arrayOf(PropTypes.object),
  sortTypes: PropTypes.arrayOf(PropTypes.object),
  checkFilterTypes: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
  onClickFeedTag: PropTypes.func.isRequired,
  checkFeedTags: PropTypes.number.isRequired,
  checkSortTypes: PropTypes.number.isRequired,
};

export default FeedHead;
