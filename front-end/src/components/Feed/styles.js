import styled, { css } from 'styled-components';
import { pallete } from '../../lib/style/pallete';

export const FeedWrapper = styled.main`
  position: relative;

  width: 100vw;
  height: calc(100vh - 50px);

  margin-top: 50px;

  transform: translateX(-16px);

  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    margin: 0 auto;

    margin-top: ${({ page }) => (page === 3 ? '40px' : '96px')};
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  .feed-head__title {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 40px;

    li {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      width: 100%;
      background: ${pallete.primary[3]};

      border-bottom: 1px solid ${pallete.gray[3]};
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

  background: ${pallete.primary[3]};

  ${({ value, check }) => {
    return value === check
      ? css`
          color: ${pallete.primary[1]};
          border-bottom: 2px solid ${pallete.primary[1]};
          padding-bottom: 12px;
        `
      : css`
          color: ${pallete.gray[5]};
        `;
  }}
`;

export const TagButton = styled.button`
  height: 28px;
  min-width: 71px;

  border: none;
  outline: none;
  background: ${pallete.primary[3]};

  border-radius: 14px;

  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;

  white-space: nowrap;

  ${({ check, checkId }) => {
    return check === checkId
      ? css`
          border: 1px solid ${pallete.primary[2]};
          color: ${pallete.primary[2]};
        `
      : css`
          border: 1px solid ${pallete.gray[3]};
          color: ${pallete.gray[3]};
        `;
  }}
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 15px;
`;

export const CardItem = styled.li`
  list-style: none;

  height: auto;
  width: 100vw;
  margin-top: 25px;

  &:first-child {
    margin-top: 0;
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

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${pallete.gray[3]};

      overflow: hidden;

      img {
        width: auto;
        height: 100%;
      }
    }

    dd {
      margin-left: 10px;

      ${({ comment }) =>
        comment
          ? css`
              display: flex;
              flex-direction: column;
              justify-content: center;

              span:first-child {
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                line-height: 19px;

                color: ${pallete.primary[1]};
              }

              span:last-child {
                margin-top: 2px;

                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;

                color: ${pallete.gray[6]};
              }
            `
          : css`
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              line-height: 19px;

              color: ${pallete.primary[1]};
            `}
    }
  }

  .feed-card__title-column:last-child {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${pallete.primary[1]};
  }
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 16px;

  margin-top: 5px;

  height: 25px;
  width: 100%;

  .feed-card__icon-column {
    display: flex;

    .icon--item {
      display: flex;

      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;

      color: ${pallete.primary[1]};

      button {
        margin-right: 4px;
        padding: 0;

        border: none;
        outline: none;

        background: ${pallete.primary[3]};
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

      color: ${pallete.gray[5]};
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

  color: ${pallete.primary[1]};
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

      background: ${pallete.primary[3]};

      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      color: ${pallete.primary[1]};
    `;
  }}
`;

export const CommentWrapper = styled.section`
  width: 100vw;

  overflow-x: hidden;
  transform: translateX(-16px);

  margin-top: 50px;
`;

export const CommentHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 126px;
  background: ${pallete.gray[1]};
`;

export const CommentItem = styled.li`
  @keyframes showCommnet {
    0% {
      background: ${pallete.gray[2]};
    }
    100% {
      background: ${pallete.primary[3]};
    }
  }

  animation: showCommnet 0.5s ease-in-out forwards;

  display: flex;
  border-top: 1px solid ${pallete.gray[3]};

  .comment-reple {
    margin-top: 23px;
    margin-right: 13px;
    padding-left: 27px;
  }

  dl {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 131px;
    width: 100%;

    dt {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${({ reple }) =>
        reple
          ? css`
              padding-right: 27px;
            `
          : css`
              padding: 0 27px;
            `}

      .comment-block__img {
        display: flex;
        align-items: center;

        div:first-child {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: ${pallete.gray[3]};

          overflow: hidden;

          img {
            width: auto;
            height: 100%;
          }
        }

        div:last-child {
          margin-left: 18px;
          display: flex;
          flex-direction: column;

          span:first-child {
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 19px;

            color: ${pallete.primary[1]};
          }

          span:last-child {
            margin-top: 2px;

            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;

            color: ${pallete.gray[6]};
          }
        }
      }
    }

    dd {
      display: flex;
      flex-direction: column;

      ${({ reple }) =>
        reple
          ? css`
              padding-right: 27px;
            `
          : css`
              padding: 0 27px;
            `}

      div:first-child {
        display: flex;
        justify-content: space-between;

        margin-top: 15px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;

        color: ${pallete.primary[1]};

        button {
          border: none;
          background: none;
          outline: none;
        }
      }

      div:last-child {
        margin-top: 6px;

        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 15px;

        color: ${pallete.gray[5]};

        span {
          margin-left: 13px;
          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            button {
              border: none;
              background: none;
              outline: none;

              font-style: normal;
              font-weight: 500;
              font-size: 11px;
              line-height: 15px;

              color: ${pallete.gray[5]};

              &:active {
                color: ${pallete.gray[4]};
              }
            }
          }
        }
      }
    }
  }

  &:last-child {
    margin-bottom: 80px;
  }
`;

export const MoreGroup = styled.div`
  @keyframes showModal {
    0% {
      transform: scale(0);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  position: relative;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    background: none;
    outline: none;
    padding: 0;

    color: ${pallete.gray[4]};

    font-size: 28px;
    transition: color 0.25s, transform 0.25s;

    &:active {
      color: ${pallete.secondary[2]};
      transform: scale(0.8);
      transition: color 0.125s, transform 0.125s;
    }

    & span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  & .more-modal {
    position: absolute;
    top: 30px;
    right: -10px;
    width: auto;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 14px;

    background: ${pallete.primary[3]};

    ${({ comment, reply, more }) =>
      comment || reply === more
        ? css`
            animation: showModal 0.2s forwards;
          `
        : css`
            animation: none;
          `}

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
      height: 100%;

      li {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 109px;
        height: 42px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        text-align: center;

        color: ${pallete.primary[1]};

        & > button {
          border: none;
          background: none;
          outline: none;
          padding: 0;

          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          text-align: center;

          &:active {
            color: ${pallete.secondary[1]};
            transform: scale(0.95);
            transition: all 0.125s;
          }
        }
      }
    }
  }
`;

export const CommentInput = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 70px;
  width: 100%;

  background: ${pallete.gray[2]};

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 19px;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${pallete.primary[3]};

    overflow: hidden;

    img {
      width: auto;
      height: 100%;
    }
  }

  input {
    width: 75%;
    height: 41px;

    border: none;
    outline: none;
    border-radius: 14px;

    background: ${pallete.primary[3]};
    padding: 10px;

    &::placeholder {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;

      color: ${pallete.gray[3]};
    }
  }
`;

export const ReplyBox = styled.div`
  position: fixed;
  left: 0;
  bottom: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  width: 100%;

  padding: 0 20px;

  background: ${pallete.gray[1]};

  & span:first-child {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;

    color: ${pallete.gray[4]};

    strong {
      font-weight: bold;
    }
  }

  & span:last-child {
    button {
      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      background: none;
      outline: none;
      padding: 0;
    }
  }
`;

export const LastFeed = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;

  color: ${pallete.gray[3]};

  margin-top: 10px;
  margin-bottom: 25vh;
`;

export const LoadingFeed = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${pallete.gray[3]};

  font-size: 5vh;

  padding-top: ${({ last }) => (last ? '10px' : '200px')};
  margin-bottom: 25vh;
`;
