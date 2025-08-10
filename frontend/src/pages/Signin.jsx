import Header from "../components/Header";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

function Signin() {
  const navigate = useNavigate();
  const username = useStore((state) => state.username);
  const setUserId = useStore((state) => state.setUserId);
  const [password, setPassword] = useState("");
  async function handleClick() {
    const userUrl = import.meta.env.VITE_APP_API_USER;
    // console.log(userUrl + "/getUser");
    try {
      const response = await axios.post(userUrl + "/getUser", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUserId(response.data.id);

      if (response) navigate("/dashboard");
    } catch (err) {
      if (err.status === 404) alert("Wrong Credentials");
    }
    // console.log(response.status);
  }
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center py-2 h-max px-4">
          <Header>Sign In</Header>
          <Subheading>Enter your credentials to Sign In</Subheading>
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
          />
          <div className="pt-4">
            <Button text="Sign In" onClick={handleClick}></Button>
          </div>
          <BottomWarning
            label="Sign Up"
            link="/signup"
            message="New to Paytmish"
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}

export default Signin;
