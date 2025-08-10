import Header from "../components/Header";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../store";
import axios from "axios";

function SendMoney() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const user = query.get("username");
  const [money, setMoney] = useState(0);
  const senderId = useStore((state) => state.userId);
  const navigate = useNavigate();

  const handleClick = async () => {
    const userUrl = import.meta.env.VITE_APP_API_ACC;
    try {
      const response = await axios.put(
        userUrl + "/transaction",
        {
          senderId: senderId,
          recieverId: id,
          amount: money,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/dashboard");
      alert(response.data);
    } catch (err) {
      alert(err.response.data);
    }
  };
  return (
    <div className="flex flex-row h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center py-2 h-max px-4 shadow">
          <div className="py-7">
            <Header>Send Money</Header>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center mt-1 mr-2 text-lg">
              {user[0]}
            </div>
            <div className="font-semibold text-xl">{user}</div>
          </div>
          <div className="text-left pt-2">
            <Inputbox
              label="Amount"
              placeholder="Enter Amount"
              setValue={setMoney}
            />
            <Button text="Initiate Transaction" onClick={handleClick}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
