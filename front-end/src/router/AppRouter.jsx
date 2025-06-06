import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";
import NotFound from "../pages/NotFound";
import Profile from "../pages/profile/Profile";
import UnderMaintenance from "../pages/UnderMaintenance";
import ProfileForm from "../pages/profile/ProfileForm";

export default function AppRouter() {
  return (
    <Routes>
      {/* Main Layout (with full Navbar + Footer) */}
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileForm />} />
        </Route>

        {/* under maintance pages */}
        <Route path="/" element={<UnderMaintenance />} />
        <Route path="/dashboard" element={<UnderMaintenance />} />
        <Route path="/courts" element={<UnderMaintenance />} />
        <Route path="/blogs" element={<UnderMaintenance />} />
        <Route path="/about" element={<UnderMaintenance />} />
        <Route path="/privacy" element={<UnderMaintenance />} />
        <Route path="/terms" element={<UnderMaintenance />} />
        <Route path="/support" element={<UnderMaintenance />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
