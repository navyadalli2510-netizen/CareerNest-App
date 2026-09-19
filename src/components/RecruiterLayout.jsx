import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./RecruiterLayout.css";

function RecruiterLayout() {
  return (
    <div className="recruiter-layout">

      {/* Top Navbar */}
      <Navbar />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="recruiter-main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default RecruiterLayout;