import React from "react";

function Button({ text, onClick }) {
  return (
    <button
      type="button"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
