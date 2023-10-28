import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login, ForgotPwd } from "./pages";
import { SalesPerformance, SalesCommission } from "./pages/Sales";
import {
  Dashboard,
  DataManagement,
  MappingManagement,
  SalesPayout,
  SalesPerformance as AdminSalesPerformance,
  UserManagement,
  CreateUser,
  UpdateUser,
  MappingCreateUser,
  MappingUpdateUser,
  PerformanceReport,
  CommissionPayoutCreate,
  CommissionPayoutUpdate,
} from "./pages/Admin";

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
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/user_management" element={<UserManagement />} />
        <Route
          path="/admin/user_management/update_user/:userId"
          element={<UpdateUser />}
        />
        <Route
          path="/admin/user_management/create_user"
          element={<CreateUser />}
        />
        <Route
          path="/admin/mapping_management"
          element={<MappingManagement />}
        />
        <Route
          path="/admin/mapping_management/update/:salesId"
          element={<MappingUpdateUser />}
        />
        <Route
          path="/admin/mapping_management/create"
          element={<MappingCreateUser />}
        />
        <Route
          path="/admin/sales_performance"
          element={<AdminSalesPerformance />}
        />
        <Route
          path="/admin/sales_performance_report"
          element={<PerformanceReport />}
        />
        <Route path="/admin/sales_payout" element={<SalesPayout />} />
        <Route
          path="/admin/sales_payout/create"
          element={<CommissionPayoutCreate />}
        />
        <Route
          path="/admin/sales_payout/update/:salesId"
          element={<CommissionPayoutUpdate />}
        />
        <Route path="/admin/data_management" element={<DataManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
