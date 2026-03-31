import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import FeedbackAdmin from "./pages/FeedbackAdmin";

/* ===============================
   PRIVATE ROUTE PROTECTION
=============================== */

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />

        {/* Feedback Management */}
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <FeedbackAdmin />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
