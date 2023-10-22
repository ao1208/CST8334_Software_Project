import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login, ForgotPwd } from "./pages";
import { SalesPerformance, SalesCommission } from "./pages/SalesDashboard";
function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot_pwd" element={<ForgotPwd />} />
        <Route path="/sales_performance" element={<SalesPerformance />} />
        <Route path="/sales_commission" element={<SalesCommission />} />
      </Routes>
    </Router>
  );
}

export default App;
