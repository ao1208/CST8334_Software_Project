import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, ForgotPwd } from "./pages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot_pwd" element={<ForgotPwd />} />
      </Routes>
    </Router>
  );
}

export default App;
