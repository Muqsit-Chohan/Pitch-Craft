import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./AuthPage/login";
import Signup from "./AuthPage/signup";
import Dashboard from "./Home/dashboard";
import CreatPitch from "./Home/creatPitch";
import GeneratedPitch from "./Home/generatedPitch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creatPitch" element={<CreatPitch />} />
        <Route path="/generatedPitch/:pitchId" element={<GeneratedPitch />} />

      </Routes>
    </Router>
  );
}

export default App;
