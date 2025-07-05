import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import Send from "../components/Send";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
