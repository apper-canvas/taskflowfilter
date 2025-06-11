import React, { forwardRef } from 'react';

const Input = forwardRef(({ value, onChange, placeholder, className, type = 'text', onBlur, onKeyDown, ...rest }, ref) => {
  const filteredProps = {
    value,
    onChange,
    placeholder,
    className,
    type,
    onBlur,
    onKeyDown,
    ref,
    ...rest // Spread any other standard input props
  };

  return (
    <input {...filteredProps} />
  );
});

Input.displayName = 'Input';

export default Input;