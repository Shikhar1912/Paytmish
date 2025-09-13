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
  const [money, setMoney] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const senderId = useStore((state) => state.userId);
  const navigate = useNavigate();

  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return false;
    }
    if (numAmount > 100000) {
      setError("Amount cannot exceed ₹1,00,000");
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    setError("");

    if (!validateAmount(money)) {
      return;
    }

    setIsLoading(true);
    const userUrl = import.meta.env.VITE_APP_API_ACC;

    try {
      const response = await axios.put(
        userUrl + "/transaction",
        {
          senderId: senderId,
          recieverId: id,
          amount: parseFloat(money),
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
      if (err.response?.status === 403) {
        setError("Transaction failed. Please check your balance.");
      } else if (err.response?.status === 400) {
        setError("Invalid amount");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4">
              {error}
            </div>
          )}

          <div className="text-left pt-2">
            <Inputbox
              label="Amount"
              placeholder="Enter Amount"
              value={money}
              setValue={setMoney}
              type="number"
            />
            <Button
              text={isLoading ? "Processing..." : "Initiate Transaction"}
              onClick={handleClick}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
