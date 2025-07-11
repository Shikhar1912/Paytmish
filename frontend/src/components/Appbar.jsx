import React from "react";

function Appbar({ User }) {
  return (
    <div className="flex shadow h-14 justify-between">
      <div className="flex flex-col justify-center h-full ml-4">Paytmish</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mt-1 mr-2 text-xl">
          {User[0]}
        </div>
      </div>
    </div>
  );
}

export default Appbar;
