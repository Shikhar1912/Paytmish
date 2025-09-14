import { useStore } from "../../store";
import Inputbox from "./Inputbox";
import ListItems from "./ListItems";
import { useEffect, useState } from "react";
function Users({ users }) {
  const [userList, setUserList] = useState(users);
  const [query, setQuery] = useState("");
  const userId = useStore((state) => state.userId);
  console.log(userId);
  function filterUsers() {
    if (query === "") setUserList(users);
    else {
      const temp = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setUserList(temp);
    }
  }
  useEffect(filterUsers, [query, users]);

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Users</div>
      <div className="flex ">
        <div className="flex-[8]">
          <Inputbox
            placeholder="Search Users..."
            value={query}
            setValue={setQuery}
          />
        </div>
      </div>

      <div className="overflow-auto max-h-[450px] bg-white rounded-md shadow-sm p-2">
        {userList && userList.length > 0 ? (
          userList.map((user) => {
            if (user._id === userId) return null;
            return (
              <ListItems
                key={user._id}
                id={user._id}
                username={user.username}
              />
            );
          })
        ) : (
          <div>No matching user</div>
        )}
      </div>
    </div>
  );
}

export default Users;
