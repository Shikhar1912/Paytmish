import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_API_ACC + "/transactions",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <div className="text-center py-4">
          <LoadingSpinner size="medium" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 ">
      <h3 className="text-lg font-semibold mt-4 mb-8 mx-2">
        Transaction History
      </h3>
      {transactions.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No transactions yet
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    transaction.type === "sent" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {transaction.type === "sent" ? "→" : "←"}
                </div>
                <div>
                  <div className="font-medium">
                    {transaction.type === "sent" ? "Sent to" : "Received from"}{" "}
                    {transaction.otherUser.firstName}{" "}
                    {transaction.otherUser.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(transaction.timestamp)}
                  </div>
                </div>
              </div>
              <div
                className={`font-semibold ${
                  transaction.type === "sent"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
