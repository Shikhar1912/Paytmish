import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import Button from "./Button.jsx";
function Appbar() {
  const navigate = useNavigate();
  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);
  console.log(username);
  const logOut = () => {
    localStorage.setItem("token", "");
    setUsername("");
    navigate("/signin   ");
  };
  return (
    <div className="flex shadow h-14 justify-between bg-white">
      <div className="flex flex-col justify-center h-full ml-4">Paytmish</div>
      <div className="flex items-center pr-3">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        {username ? (
          <>
            <div className="rounded-full h-10 w-10 bg-indigo-100 flex items-center justify-center text-xl mr-4">
              {username[0].toUpperCase()}
            </div>
            <div className="flex flex-col justify-center h-full w-18 mt-2">
              <Button text="Log Out" onClick={logOut} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center h-full w-18 mt-2">
              <Button text="Sign In" onClick={() => navigate("/signin")} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Appbar;
