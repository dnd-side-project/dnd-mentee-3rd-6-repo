import React from 'react';
import PropTypes from 'prop-types';

import { CardImageBox } from './styles';

const FeedCardImage = ({ image }) => {
  return (
    <CardImageBox>
      <img src={image} alt={image} />
    </CardImageBox>
  );
};

FeedCardImage.prototype = {
  image: PropTypes.string.isRequired,
};

export default FeedCardImage;
