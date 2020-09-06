import React from 'react';
// import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const MessageIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.7 7.29999C11.2941 8.70588 10.0818 9.91817 9.10001 10.9"
        stroke={pallete.primary[1]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 1L12.7 19L9.1 10.9L1 7.3L19 1Z"
        stroke={pallete.primary[1]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

MessageIcon.prototype = {};

export default MessageIcon;
