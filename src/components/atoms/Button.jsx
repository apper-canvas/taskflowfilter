import React from 'react';

const Button = ({ onClick, children, className, type = 'button', disabled, title, ...rest }) => {
  const filteredProps = {
    onClick,
    className,
    type,
    disabled,
    title,
    ...rest // Spread any other standard button props
  };

  return (
    <button {...filteredProps}>
      {children}
    </button>
  );
};

export default Button;