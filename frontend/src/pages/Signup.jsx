import { useState } from "react";
import Header from "../components/Header";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
function Signup() {
  const navigate = useNavigate();
  const username = useStore((state) => state.username);
  const lastName = useStore((state) => state.lastName);
  const firstName = useStore((state) => state.firstName);
  const setUserId = useStore((state) => state.setUserId);
  const [password, setPassword] = useState("");
  async function handleClick() {
    // console.log("clicked");
    const userUrl = import.meta.env.VITE_APP_API_USER;
    console.log(userUrl);
    try {
      const res = await axios.post(userUrl + "/addUser", {
        firstName,
        lastName,
        username,
        password,
      });
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      setUserId(res.data.id);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data);
    }
  }
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center py-2 h-max px-4">
          <Header>Sign Up</Header>
          <Subheading>
            Welcome to Paytmish. Enter your details to sign up.
          </Subheading>
          <Inputbox
            placeholder="Enter your first name"
            label="First Name"
            value={firstName}
            setValue={useStore((state) => state.setFirstName)}
          />
          <Inputbox
            placeholder="Enter your last name"
            label="Last Name"
            value={lastName}
            setValue={useStore((state) => state.setLastName)}
          />
          <Inputbox
            placeholder="Enter your username"
            label="username"
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
            <Button text={"Sign Up"} onClick={handleClick}></Button>
          </div>
          <BottomWarning
            label="Sign In"
            link="/signin"
            message="Already registered."
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}

export default Signup;
