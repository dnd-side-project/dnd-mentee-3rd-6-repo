import React from 'react';
import { pallete } from '../pallete';

const BackIcon = () => {
  return (
    <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 16L1 8.5L8.5 1"
        stroke={pallete.primary[1]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackIcon;
