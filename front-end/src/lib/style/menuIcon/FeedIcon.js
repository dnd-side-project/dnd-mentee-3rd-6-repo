import React from 'react';

import PropTypes from 'prop-types';
import { pallete } from '../pallete';

const FeedIcon = ({ pathname }) => {
  return (
    <svg width="19" height="35" viewBox="0 0 19 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.70755 0.196402C9.35398 -0.0654673 8.87078 -0.0654673 8.51721 0.196402L1.21448 5.60505C0.450557 6.17084 0 7.06522 0 8.01585V16.4499C0 17.1867 0.307796 17.8827 0.83841 18.388C1.36736 18.8917 2.07477 19.1666 2.80275 19.1666H6.0634C6.06567 19.1666 6.06795 19.1666 6.07024 19.1666C6.36364 19.1666 6.62753 19.0402 6.81045 18.839C6.97186 18.6614 7.07023 18.4255 7.07024 18.1666C7.07024 18.1666 7.07024 18.1666 7.07024 18.1666C7.07024 18.1661 7.07024 18.1657 7.07024 18.1652V11.9386H11.1545V18.1666L11.1545 18.1666C11.1545 18.2011 11.1563 18.2352 11.1597 18.2688C11.1798 18.4665 11.2574 18.6471 11.3755 18.7937C11.5588 19.0211 11.8397 19.1666 12.1545 19.1666C12.1568 19.1666 12.1591 19.1666 12.1614 19.1666H15.422C16.15 19.1666 16.8574 18.8917 17.3863 18.388C17.917 17.8827 18.2248 17.1867 18.2248 16.4499V8.01584C18.2248 7.06521 17.7742 6.17084 17.0103 5.60505L9.70755 0.196402ZM13.1545 17.1666H15.422C15.6503 17.1666 15.8599 17.0798 16.0071 16.9396C16.1527 16.801 16.2248 16.6238 16.2248 16.4499V8.01584C16.2248 7.69897 16.0746 7.40084 15.8199 7.21225L9.11238 2.2444L2.40483 7.21225C2.15019 7.40084 2 7.69897 2 8.01585V16.4499C2 16.6238 2.07207 16.801 2.21762 16.9396C2.36483 17.0798 2.57449 17.1666 2.80275 17.1666H5.07024V11.9386C5.07024 10.834 5.96567 9.93857 7.07024 9.93857H11.1545C12.2591 9.93857 13.1545 10.834 13.1545 11.9386V17.1666Z"
        fill={pathname === '/feed' ? pallete.orange : pallete.gray[4]}
      />
      <path
        d="M11.8963 27.952H9.40831V27.304H8.57631V27.952H6.04831V28.584H11.8963V27.952ZM7.32031 33.072H10.6563V33.912H7.32031V33.072ZM6.50431 34.528H11.4643V32.448H6.50431V34.528ZM7.49631 29.848C7.49631 29.528 8.00831 29.384 8.99231 29.384C9.96831 29.384 10.4883 29.528 10.4883 29.848C10.4883 30.16 9.96831 30.312 8.99231 30.312C8.00831 30.312 7.49631 30.16 7.49631 29.848ZM9.40831 31.328V30.872C10.6643 30.808 11.3603 30.456 11.3603 29.848C11.3603 29.168 10.5123 28.816 8.99231 28.816C7.46431 28.816 6.61631 29.168 6.61631 29.848C6.61631 30.456 7.31231 30.808 8.57631 30.872V31.328H5.72031V31.976H12.2563V31.328H9.40831Z"
        fill={pathname === '/feed' ? pallete.orange : pallete.gray[4]}
      />
    </svg>
  );
};

FeedIcon.prototype = {
  pathname: PropTypes.string.isRequired,
};

export default FeedIcon;