import React from 'react';

const ErrorIcon = () => {
  return (
    <div
      data-testid="error-icon"
      className="material-icons mr-1"
      style={{
        color: '#dc3545',
        fontSize: '1rem',
        marginRight: '0.2rem',
      }}
    >
      error
    </div>
  );
};

export default ErrorIcon;
