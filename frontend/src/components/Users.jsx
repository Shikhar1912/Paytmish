import { useStore } from "../../store";
import Inputbox from "./Inputbox";
import ListItems from "./ListItems";
function Users({ users }) {
  const userId = useStore((state) => state.userId);
  console.log(userId);
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Users</div>
      <Inputbox placeholder="Search Users..." />
      <div className="overflow-auto max-h-[450px] bg-white rounded-md shadow-sm p-2">
        {users.map((user) => {
          if (user._id === userId) return null;
          return (
            <ListItems key={user._id} id={user._id} username={user.firstName} />
          );
        })}
      </div>
    </div>
  );
}

export default Users;
