import Button from "./Button";

function ListItems({ user }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row justify-between gap-2 items-center">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center mt-1 mr-2 text-lg">
          {user[0]}
        </div>
        <div>{user}</div>
      </div>
      <div className="w-32">
        <Button>Send Money</Button>
      </div>
    </div>
  );
}

export default ListItems;
