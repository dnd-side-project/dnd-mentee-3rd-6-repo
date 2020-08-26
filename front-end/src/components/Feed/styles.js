import styled from 'styled-components';
import { pallete } from '../../lib/style/pallete';

export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 122px;
  margin-top: 14px;

  border-bottom: 1px solid ${pallete.gray[3]};
  transform: translateX(-16px);
`;

export const FeedHeaderMenu = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${pallete.gray[2]};

  width: 100%;
  height: 58px;

  button {
    width: 125px;
    height: 58px;

    border: none;
    outline: none;
    background: ${pallete.white};

    border-bottom: 2px solid ${pallete.orange};

    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
  }
`;

export const FeedHeaderTag = styled.div`
  position: relative;
  width: 381px;
  height: 28px;

  margin-top: 16px;

  overflow-x: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .tag-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    width: auto;
    height: 28px;

    display: flex;
    justify-content: space-around;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 71px;
      height: 28px;
      margin-left: 9px;

      border: none;
      outline: none;
      background: ${pallete.white};

      border: 1px solid ${pallete.orange};
      border-radius: 14px;

      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 16px;
      text-align: center;

      color: ${pallete.orange};

      &:first-child {
        margin-left: 22px;
      }

      &:last-child {
        margin-right: 22px;
      }
    }
  }
`;

export const FeedCardWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  height: 470px;
`;

export const FeedCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .feed-card-title-img {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: ${pallete.gray[3]};

    overflow: hidden;
    img {
      width: auto;
      height: 100%;
    }
  }

  .feed-card-title__column {
    display: flex;
    align-items: center;
  }
`;

export const FeedCardImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 350px;

  margin-top: 12px;

  overflow: hidden;
  transform: translateX(-16px);

  img {
    width: auto;
    height: 310px;
  }
`;

export const FeedCardFooter = styled.div`
  display: flex;
  justify-content: space-between;

  height: 40px;
  width: 100%;

  border: 1px solid red;

  .feed-card-image__column:first-child {
    margin-left: 16px;
  }

  .feed-card-image__column:last-child {
    margin-right: 16px;
  }
`;

export const FeedCardContent = styled.div``;
