import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ListItems({ username, id }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/send?id=${id}&username=${username}`);
  // console.log(user);
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row justify-between gap-2 items-center">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center mt-1 mr-2 text-lg">
          {username[0].toUpperCase()}
        </div>
        <div>{username}</div>
      </div>
      <div className="w-32">
        <Button text="Send Money" onClick={onClick}></Button>
      </div>
    </div>
  );
}

export default ListItems;
