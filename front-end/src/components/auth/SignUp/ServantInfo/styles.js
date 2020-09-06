import styled, { css, createGlobalStyle } from 'styled-components';
import { pallete } from '../../../../lib/style/pallete';

export const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 40vh;
`;

export const AddressButton = styled.button`
  border: none;
  outline: none;
  background: none;

  padding: 5px;

  font-size: 18px;

  color: ${pallete.primary[1]};
`;

export const MapModal = styled.div`
  position: fixed;
  bottom: -36vh;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 300px;

  box-shadow: 0px -3px 15px rgba(43, 43, 39, 0.15);
  border-radius: 30px;

  background: ${pallete.primary[3]};

  p {
    margin-top: 60px;

    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    text-align: center;

    color: ${pallete.primary[1]};

    strong {
      font-weight: bold;
      color: ${pallete.primary[2]};
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-35vh);
    }
    70% {
      transform: translateY(-30vh);
    }
    90% {
      transform: translateY(-30.5vh);
    }
    100% {
      transform: translateY(-30vh);
    }
  }

  ${({ currentGPSLoading }) =>
    !currentGPSLoading &&
    css`
      animation: slideUp 0.5s ease-out forwards;
      animation-delay: 0.5s;
    `}
`;

export const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 80vh;

  margin-top: 10vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const InfoMap = createGlobalStyle`
    .info-map {
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;
    
        width: 152px;
        height: 31px;

        background: ${pallete.secondary[1]};

        border-radius: 14px;

        p {
            font-style: normal;
            font-weight: bold;
            font-size: 10px;
            line-height: 14px;

            color:${pallete.primary[3]};
        }

        span {
            position: absolute;
            bottom: -15px;
            right: 35px;

            width: 0px;
            height: 0px;
            border-top: 15px solid ${pallete.secondary[1]};
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
        }
    }
`;
