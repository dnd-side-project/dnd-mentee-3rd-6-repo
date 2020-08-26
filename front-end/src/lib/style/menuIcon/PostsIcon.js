import React from 'react';
import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const PostsIcon = ({ value, pageURL }) => {
  return (
    <svg width="52" height="64" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="1"
        width="16"
        height="16"
        rx="3"
        stroke={value === pageURL ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1="7"
        y1="9"
        x2="15"
        y2="9"
        stroke={value === pageURL ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="11"
        y1="5"
        x2="11"
        y2="13"
        stroke={value === pageURL ? pallete.orange : pallete.gray[4]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

PostsIcon.prototype = {
  value: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
};

export default PostsIcon;
