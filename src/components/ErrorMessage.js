import React from 'react';

function ErrorMessage({ error }) {
  const errorClass = `error-message ${error.type}-error`;
  
  return (
    <div className={errorClass}>
      <span className="error-icon">⚠️</span>
      <p>{error.message}</p>
    </div>
  );
}

export default ErrorMessage;