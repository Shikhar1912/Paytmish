import Header from "../components/Header";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

function Signin() {
  const navigate = useNavigate();
  const username = useStore((state) => state.username);
  const setUserId = useStore((state) => state.setUserId);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form validation
  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  async function handleClick() {
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await userApi.post("/getUser", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUserId(response.data.id);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials");
      } else if (err.response?.status === 404) {
        setError("User not found");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center py-2 h-max px-4">
          <Header>Sign In</Header>
          <Subheading>Enter your credentials to Sign In</Subheading>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <Inputbox
            placeholder="Enter your username"
            label="Username"
            value={username}
            setValue={useStore((state) => state.setUsername)}
          />
          <Inputbox
            placeholder="Enter your password"
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <div className="pt-4">
            <Button
              text={isLoading ? "Signing In..." : "Sign In"}
              onClick={handleClick}
              disabled={isLoading}
            />
          </div>
          <BottomWarning
            label="Sign Up"
            link="/signup"
            message="New to Paytmish"
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
