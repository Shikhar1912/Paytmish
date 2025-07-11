import React from "react";
import { Link } from "react-router-dom";
function BottomWarning({ label, link, message }) {
  return (
    <div className="text-sm flex justify-center">
      <div>{message}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={link}>
        {label}
      </Link>
    </div>
  );
}

export default BottomWarning;
