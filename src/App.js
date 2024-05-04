import LoginComponent from "./components/LoginComponent/LoginComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const LoginCmpnt = () => (
    <>
      <div className="upper-container"></div>
      <div className="login-signnup-header-container">!Login</div>
      <LoginComponent />
    </>
  );

  const SignupCmpnt = () => (
    <>
      <div className="upper-container"></div>
      <div className="login-signnup-header-container">!Signup</div>
      <SignupComponent />
    </>
  );
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginCmpnt/>} />
        <Route path="/signup" element={<SignupCmpnt/>} />
      </Routes>
    </Router>
  );
};

export default App;
