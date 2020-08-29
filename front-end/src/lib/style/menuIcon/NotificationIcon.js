import React from 'react';
import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const NotificationIcon = ({ pathname }) => {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2857 8.61907C15.2857 7.10355 14.6837 5.6501 13.612 4.57846C12.5404 3.50682 11.087 2.90479 9.57143 2.90479C8.05591 2.90479 6.60245 3.50682 5.53082 4.57846C4.45918 5.6501 3.85714 7.10355 3.85714 8.61907C3.85714 15.2857 1 17.1905 1 17.1905H18.1429C18.1429 17.1905 15.2857 15.2857 15.2857 8.61907Z"
        stroke={pathname === '/notification' ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17.1905C6 17.1905 6 17.1905 6 17.1905C6 19.2944 7.70558 21 9.80952 21C11.9135 21 13.619 19.2944 13.619 17.1905C13.619 17.1905 13.619 17.1905 13.619 17.1905H11.619C11.619 17.1905 11.619 17.1905 11.619 17.1905C11.619 18.1899 10.8089 19 9.80952 19C8.81015 19 8 18.1899 8 17.1905C8 17.1905 8 17.1905 8 17.1905H6Z"
        fill={pathname === '/notification' ? pallete.orange : pallete.gray[4]}
      />
      <path
        d="M9.5 1V2.90476"
        stroke={pathname === '/notification' ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.43663 30.248C3.43663 29.672 3.90063 29.296 4.54063 29.296C5.17263 29.296 5.62863 29.672 5.62863 30.248C5.62863 30.824 5.17263 31.208 4.54063 31.208C3.90063 31.208 3.43663 30.824 3.43663 30.248ZM6.42863 30.248C6.42863 29.296 5.62863 28.624 4.54063 28.624C3.44463 28.624 2.63663 29.296 2.63663 30.248C2.63663 31.2 3.44463 31.872 4.54063 31.872C5.62863 31.872 6.42863 31.2 6.42863 30.248ZM4.34863 34.216H8.18863V32.352H3.52463V33H7.37263V33.616H3.54063V35.528H8.42863V34.872H4.34863V34.216ZM8.18863 29.872V28.384H7.36463V32.04H8.18863V30.552H9.20463V29.872H8.18863ZM14.284 31.488C13.236 31.664 12.332 31.704 11.092 31.704V30.88H13.564V28.808H10.26V29.472H12.756V30.248H10.276V32.376H10.884C12.268 32.376 13.244 32.344 14.38 32.16L14.284 31.488ZM11.94 33.696H15.052V34.872H11.94V33.696ZM11.132 35.528H15.86V33.04H11.132V35.528ZM15.036 28.384V32.68H15.86V28.384H15.036Z"
        fill={pathname === '/notification' ? pallete.orange : pallete.gray[4]}
      />
    </svg>
  );
};

NotificationIcon.prototype = {
  pathname: PropTypes.string.isRequired,
};

export default NotificationIcon;
