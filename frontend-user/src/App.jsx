import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssistantProvider } from "./context/AssistantContext";

import Portal from "./pages/Portal";
import HelpCenter from "./pages/HelpCenter";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <AssistantProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </AssistantProvider>
  );
}
