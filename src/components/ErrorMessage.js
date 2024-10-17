import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
