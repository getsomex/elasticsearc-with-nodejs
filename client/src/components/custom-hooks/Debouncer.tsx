import React, { useEffect, useState, SetStateAction, Dispatch } from 'react';

const useDebounce = (searcValue: string, timeOut: number): string => {
  const [debounceValue, setDebounceValue] = useState(searcValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searcValue);
    }, timeOut);

    return () => {
      clearTimeout(handler);
    };
  }, [searcValue]);

  return debounceValue;
};

export default useDebounce;
