import React from "react";

function Button({ text, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={`w-full text-white font-medium rounded-lg text-sm py-2.5 mb-2 focus:outline-none ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
