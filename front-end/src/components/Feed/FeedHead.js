import React from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderButton, TagButton } from './styles';

const FilterType = ({ filterType, checkFilterType, onClickFilter }) => {
  return (
    <li>
      <HeaderButton
        type="button"
        value={filterType.id}
        check={checkFilterType}
        onClick={onClickFilter(filterType.id)}
      >
        {filterType.name}
      </HeaderButton>
    </li>
  );
};

const FeedTag = ({ feedTag, onClickFeedTag, checkFeedTag, checkSortType }) => {
  return (
    <li>
      <TagButton
        type="button"
        check={checkFeedTag || checkSortType}
        checkId={feedTag.id}
        onClick={onClickFeedTag(feedTag.id)}
      >
        {`${checkFeedTag ? '#' : ''}${feedTag.name}`}
      </TagButton>
    </li>
  );
};

const FeedHead = ({
  filterTypes,
  feedTags,
  sortTypes,
  checkFilterType,
  checkFeedTag,
  checkSortType,
  onClickFilter,
  onClickFeedTag,
}) => {
  return (
    <Header>
      <ul className="feed-head__title">
        {filterTypes.map((filterType) => (
          <FilterType
            key={filterType.id}
            filterType={filterType}
            checkFilterType={checkFilterType}
            onClickFilter={onClickFilter}
          />
        ))}
      </ul>
      {checkFilterType !== 3 && (
        <div className="feed-head__tag">
          <ul>
            {checkFilterType === 1
              ? feedTags.map((feedTag) => (
                  <FeedTag
                    key={feedTag.id}
                    checkFeedTag={checkFeedTag}
                    feedTag={feedTag}
                    onClickFeedTag={onClickFeedTag}
                  />
                ))
              : checkFilterType === 2
              ? sortTypes.map((sortType) => (
                  <FeedTag
                    key={sortType.id}
                    checkSortType={checkSortType}
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
  checkFilterType: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
};

FeedTag.prototype = {
  feedTag: PropTypes.object.isRequired,
  checkFeedTag: PropTypes.number.isRequired,
  checkSortType: PropTypes.number.isRequired,
  onClickFeedTag: PropTypes.func.isRequired,
};

FeedHead.prototype = {
  filterTypes: PropTypes.arrayOf(PropTypes.object),
  feedTags: PropTypes.arrayOf(PropTypes.object),
  sortTypes: PropTypes.arrayOf(PropTypes.object),
  checkFilterType: PropTypes.number.isRequired,
  checkFeedTag: PropTypes.number.isRequired,
  checkSortType: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
  onClickFeedTag: PropTypes.func.isRequired,
};

export default React.memo(FeedHead);
