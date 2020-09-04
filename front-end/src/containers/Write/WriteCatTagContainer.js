import React, { useCallback, useState } from 'react';
import WriteCatTag from '../../components/Write/WriteCatTag';

const WriteCatTagContainer = () => {
  const [check, setCheck] = useState(null);

  const onClickCheck = useCallback(
    (index) => () => {
      setCheck(index);
      if (check === index) {
        setCheck(null);
      }
    },
    [check],
  );

  return <WriteCatTag check={check} onClickCheck={onClickCheck} />;
};

export default WriteCatTagContainer;
