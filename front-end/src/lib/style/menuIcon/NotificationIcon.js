import React from 'react';
import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const NotificationIcon = ({ value, pageURL }) => {
  return (
    <svg width="50" height="66" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2857 8.61907C15.2857 7.10355 14.6837 5.6501 13.612 4.57846C12.5404 3.50682 11.087 2.90479 9.57143 2.90479C8.05591 2.90479 6.60245 3.50682 5.53082 4.57846C4.45918 5.6501 3.85714 7.10355 3.85714 8.61907C3.85714 15.2857 1 17.1905 1 17.1905H18.1429C18.1429 17.1905 15.2857 15.2857 15.2857 8.61907Z"
        stroke={value === pageURL ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17.1905C6 17.1905 6 17.1905 6 17.1905C6 19.2944 7.70558 21 9.80952 21C11.9135 21 13.619 19.2944 13.619 17.1905C13.619 17.1905 13.619 17.1905 13.619 17.1905H11.619C11.619 17.1905 11.619 17.1905 11.619 17.1905C11.619 18.1899 10.8089 19 9.80952 19C8.81015 19 8 18.1899 8 17.1905C8 17.1905 8 17.1905 8 17.1905H6Z"
        fill={value === pageURL ? pallete.orange : pallete.gray[4]}
      />
      <path
        d="M9.5 1V2.90476"
        stroke={value === pageURL ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

NotificationIcon.prototype = {
  value: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
};

export default NotificationIcon;
