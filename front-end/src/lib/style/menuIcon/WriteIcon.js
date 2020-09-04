import React from 'react';
import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const WriteIcon = ({ pathname }) => {
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="1"
        width="16"
        height="16"
        rx="3"
        stroke={pathname === '/feed' ? pallete.primary[2] : pallete.gray[3]}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="9"
        x2="15"
        y2="9"
        stroke={pathname === '/feed' ? pallete.primary[2] : pallete.gray[3]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="11"
        y1="5"
        x2="11"
        y2="13"
        stroke={pathname === '/feed' ? pallete.primary[2] : pallete.gray[3]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.96094 32.216H6.10494V30.296H1.12094V30.952H5.28094V31.6H1.13694V33.544H6.28894V32.896H1.96094V32.216ZM5.94494 29.016C6.09694 28.248 6.09694 27.64 6.09694 27.168V26.688H1.19294V27.352H5.28894C5.28894 27.8 5.26494 28.328 5.12094 29.016H0.368938V29.68H6.91294V29.016H5.94494ZM11.9763 29.824C10.8723 29.456 10.2643 28.568 10.2643 27.656V27.528H11.7763V26.856H7.89631V27.528H9.43231V27.656C9.43231 28.648 8.80031 29.568 7.65631 29.952L8.08831 30.6C8.93631 30.304 9.53631 29.712 9.85631 28.952C10.1683 29.64 10.7443 30.192 11.5523 30.456L11.9763 29.824ZM8.61631 31.76H12.5443V33.616H13.3683V31.096H8.61631V31.76ZM14.3923 28.232H13.3683V26.384H12.5443V30.744H13.3683V28.912H14.3923V28.232ZM20.2477 30.648H21.0717V26.384H20.2477V27.832H18.7837V28.504H20.2477V30.648ZM19.3757 29.712C18.2797 29.352 17.6797 28.448 17.6797 27.448V26.776H16.8477V27.488C16.8477 28.544 16.2157 29.52 15.0557 29.912L15.4877 30.576C16.3597 30.264 16.9677 29.632 17.2877 28.832C17.5997 29.536 18.1597 30.08 18.9357 30.36L19.3757 29.712ZM18.6637 32.968C17.6397 32.968 17.0557 32.704 17.0557 32.232C17.0557 31.76 17.6397 31.496 18.6637 31.496C19.6877 31.496 20.2797 31.76 20.2797 32.232C20.2797 32.704 19.6877 32.968 18.6637 32.968ZM18.6637 30.848C17.1597 30.848 16.2317 31.36 16.2317 32.232C16.2317 33.104 17.1597 33.616 18.6637 33.616C20.1757 33.616 21.1037 33.104 21.1037 32.232C21.1037 31.36 20.1757 30.848 18.6637 30.848Z"
        fill={pathname === '/feed' ? pallete.primary[2] : pallete.gray[3]}
      />
    </svg>
  );
};

WriteIcon.prototype = {
  pathname: PropTypes.string.isRequired,
};

export default WriteIcon;
