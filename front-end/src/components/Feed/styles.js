import styled, { css, createGlobalStyle } from 'styled-components';
import { pallete } from '../../lib/style/pallete';

export const Wrapper = styled.main`
  position: relative;
  width: 100vw;
  height: 645px;

  margin-top: 14px;

  transform: translateX(-16px);

  .feed-list {
    position: absolute;
    top: 0;

    width: 100%;
    height: 645px;

    overflow-x: hidden;
    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  /* height: 122px; */

  .feed-head__title {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 58px;

    li {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      width: 100%;
      background: ${pallete.white};

      border-bottom: 1px solid ${pallete.gray[4]};
    }
  }

  .feed-head__tag {
    position: relative;
    width: 100%;
    height: 56px;

    padding-top: 16px;

    background: ${pallete.gray[1]};

    overflow-x: auto;
    overflow-y: hidden;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }

    ul {
      position: absolute;
      top: 14px;
      left: 0;

      width: auto;
      height: 28px;

      display: flex;

      li {
        margin-left: 9px;

        button {
          height: 28px;
          min-width: 90px;

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
        }

        &:first-child {
          margin-left: 16px;
        }

        &:last-child {
          margin-right: 16px;
        }
      }
    }
  }
`;

export const HeaderButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;

  padding: 0;
  padding-bottom: 14px;

  border: none;
  outline: none;

  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;

  background: ${pallete.white};

  ${({ value, titleIndex }) => {
    return value === parseInt(titleIndex, 10)
      ? css`
          color: ${pallete.gray[6]};
          border-bottom: 2px solid ${pallete.gray[5]};
        `
      : css`
          color: ${pallete.gray[4]};
        `;
  }}
`;

export const CardList = styled.section`
  margin-top: 21px;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 15px;
  }
`;

export const CardItem = styled.li`
  list-style: none;

  width: 100%;
  height: auto;
  margin-top: 25px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 40px;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  .feed-card__title-column:first-child {
    display: flex;
    align-items: center;

    dt {
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

    dd {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 19px;

      color: ${pallete.gray[6]};
      margin-left: 10px;
    }
  }

  .feed-card__title-column:last-child {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${pallete.gray[6]};
  }
`;

export const CardImage = styled.div`
  position: relative;
  width: 100vw;
  height: 319px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 12px;

  overflow: hidden;

  .feed-card__img-index {
    position: absolute;
    top: 18px;
    right: 22px;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 25px;
    width: 38px;
    background: rgba(31, 31, 31, 0.7);
    border-radius: 14px;

    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;

    color: ${pallete.white};

    z-index: 999;
  }
`;

export const CardImageBox = styled.div`
  width: 100vw;
  height: 319px;

  overflow: hidden;

  display: flex !important;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 319px;
  }
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 16px;

  height: 25px;
  width: 100%;

  .feed-card__icon-column {
    display: flex;

    .icon--item {
      display: flex;

      button {
        margin-right: 4px;
        padding: 0;

        border: none;
        outline: none;

        background: ${pallete.white};
      }

      &:last-child {
        margin-left: 16px;
      }
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 16px;
  margin-top: 16px;

  .feed-card__content-column:first-child {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }

  .feed-card__content-column:last-child {
    margin-top: 6px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;

      color: ${pallete.gray[4]};
    }
  }
`;

export const CardContentText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  /* max-width: 85%;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; */

  color: ${pallete.gray[6]};
`;

export const CardContentButton = styled.button`
  ${({ length }) => {
    if (length <= 22) {
      return css`
        display: none;
      `;
    }
    return css`
      display: flex;
      justify-content: center;
      align-items: center;

      height: 19px;
      padding: 0;

      border: none;
      outline: none;

      background: ${pallete.white};

      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      color: ${pallete.gray[4]};
    `;
  }}
`;

export const CommentSection = styled.section`
  position: relative;
  width: 100vw;
  height: 70vh;

  overflow-y: scroll;
  overflow-x: hidden;
  transform: translateX(-16px);

  margin-top: 18px;

  border: 1px solid red;

  & > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  header {
    height: 126px;
    background: ${pallete.gray[1]};
  }

  dl {
    height: 131px;
    border-top: 1px solid ${pallete.gray[3]};
  }
`;

export const FeedSlickStyle = createGlobalStyle`
  .slick-list {
    width: 375px;
    height: 319px;
  }

  .slick-slide {
    width: 375px;
    height: 319px;
  }

`;
