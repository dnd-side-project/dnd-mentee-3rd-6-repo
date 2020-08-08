import { useState, useCallback } from 'react';

const useInput = (initialValue) => {
  const [value, setVlaue] = useState(initialValue);
  const handler = useCallback((e) => {
    setVlaue(e.target.value);
  }, []);

  return [value, handler, setVlaue];
};

export default useInput;
