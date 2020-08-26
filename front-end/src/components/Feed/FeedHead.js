import React from 'react';
import { FeedHeader, FeedHeaderMenu, FeedHeaderTag } from './styles';

const FeedHead = () => {
  return (
    <>
      <FeedHeader>
        <FeedHeaderMenu>
          <button type="button">우리동네</button>
          <button type="button">전체</button>
          <button type="button">내 친구</button>
        </FeedHeaderMenu>
        <FeedHeaderTag>
          <div className="tag-wrapper">
            <button type="button">#일상</button>
            <button type="button">#나눔</button>
            <button type="button">#구조</button>
            <button type="button">#탁묘</button>
            <button type="button">#냥이자랑</button>
            <button type="button">#우리동네</button>
            <button type="button">#우리동네</button>
          </div>
        </FeedHeaderTag>
      </FeedHeader>
    </>
  );
};

export default FeedHead;
