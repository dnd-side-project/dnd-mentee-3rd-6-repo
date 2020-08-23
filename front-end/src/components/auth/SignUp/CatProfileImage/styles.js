import styled from 'styled-components';
import { pallete } from '../../../../lib/style/pallete';

export const PrevImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 180px;
  background: ${pallete.gray[2]};

  border-radius: 50%;
  overflow: hidden;

  margin: 35px auto 0 auto;

  img {
    max-width: 100%;
    height: auto;

    background: ${pallete.gray[2]};
  }
`;

export const ProfileHeader = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;

  text-align: center;

  strong {
    font-weight: bold;
  }
`;

export const ImageBox = styled.div`
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 230px;
  height: 230px;
  background: ${pallete.gray[2]};

  border-radius: 50%;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;

    background: ${pallete.gray[2]};
  }
`;

export const Imagebutton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translate(80px, -60px);
  width: 45px;
  height: 45px;

  color: ${pallete.white};
  font-size: 18px;
  outline: none;

  border: 2px solid ${pallete.white};
  background: ${pallete.orange};
  border-radius: 50%;
  transition: all 0.25s;

  &:active {
    border: 4px solid ${pallete.gray[3]};
    transition: all 0.25s;
  }
`;

export const EnrollImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 34px;

  width: 120px;
  height: 120px;
  background: ${pallete.gray[2]};
  border-radius: 50%;

  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    margin-top: 22px;

    color: ${pallete.gray[4]};
  }
`;

export default ProfileImageWrapper;
