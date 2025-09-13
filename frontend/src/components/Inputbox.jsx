import React from "react";

function Inputbox({ label, placeholder, setValue, type = "text", value }) {
  return (
    <div className=" w-full flex flex-col gap-2 text-left pb-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Inputbox;
