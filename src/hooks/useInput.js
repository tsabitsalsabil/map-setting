import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');
  const onChangeInputValueHandler = ({ target }) => {
    setInputValue(target.value);
  };
  return [inputValue, onChangeInputValueHandler, setInputValue];
};

export default useInput;
