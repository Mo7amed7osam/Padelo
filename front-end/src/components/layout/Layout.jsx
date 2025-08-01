import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import Loader from "../ui/Loader";
import { useUI } from "../../context/UIContext";
import { Outlet } from "react-router-dom";

export default function Layout({ isContainer = true }) {
  const { loading } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      {loading && <Loader />}
      <main
        className={`mt-20 min-h-[calc(100vh-80px)] flex-1 ${
          isContainer ? "container mx-auto px-4" : ""
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
