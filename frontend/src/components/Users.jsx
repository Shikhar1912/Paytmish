import React from "react";
import Inputbox from "./Inputbox";
import ListItems from "./ListItems";
function Users() {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Users</div>
      <Inputbox placeholder="Search Users..." />
      <ListItems user="Shikhar" />
    </div>
  );
}

export default Users;
