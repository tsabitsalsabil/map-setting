import React from 'react';

function FormInput({
  inputType, inputPlaceholder, inputStyle, value = '', onChange, isDisabled,
}) {
  return (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      className={`border w-full py-2 px-4 rounded-md ${inputStyle}`}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
}

export default FormInput;
