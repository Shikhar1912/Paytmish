import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import TransactionHistory from "../components/TransactionHistory";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { useStore } from "../../store";
function Dashboard() {
  const [userList, setUserList] = useState([]);
  const balance = useStore((state) => state.balance);
  const setBalance = useStore((state) => state.setBalance);
  console.log(userList);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        import.meta.env.VITE_APP_API_USER + "/?filter=",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const accURL = import.meta.env.VITE_APP_API_ACC;
      const userBalance = await axios.get(accURL + "/balance", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setBalance(userBalance.data.balance);
      setUserList(response.data);
    })();
  }, []);
  return (
    <div className=" h-screen bg-gray-100">
      <Appbar />
      <div className="px-10 pt-6 flex flex-col gap-5">
        <Balance value={balance} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {userList.length === 0 ? (
            <div className="col-span-2 flex justify-center items-center py-8">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <Users users={userList} />
          )}
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
