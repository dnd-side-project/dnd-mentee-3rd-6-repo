import React from 'react';
import PropTypes from 'prop-types';

const CancelIcon = ({ color }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
        fill={color}
      />
      <path
        d="M11.7 6.30005L6.3 11.7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3 6.30005L11.7 11.7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CancelIcon.prototype = {
  color: PropTypes.string.isRequired,
};

export default CancelIcon;
