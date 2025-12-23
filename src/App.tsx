import Navbar from "./components/Navbar";
import FlowPage from "./pages/FlowPage";
import TierListPage from "./pages/TierListPage";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/flow" replace />} />
        <Route path="/tierlist" element={<TierListPage />} />
        <Route path="/flow" element={<FlowPage />} />
      </Routes>
    </div>
  );
}
