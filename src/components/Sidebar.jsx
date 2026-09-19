import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  UsersRound,
  UserRound,
  LogOut
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("recruiterName");

    navigate("/login");
  };

  return (
    <aside className="recruiter-sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        CareerNest
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">

        {/* DASHBOARD */}
        <NavLink
          to="/recruiter/dashboard"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        {/* JOBS */}
        <NavLink
          to="/recruiter/jobs"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <BriefcaseBusiness size={19} />
          <span>Jobs</span>
        </NavLink>

        {/* APPLICANTS */}
        <NavLink
          to="/recruiter/applicants"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <UsersRound size={19} />
          <span>Applicants</span>
        </NavLink>

        {/* PROFILE */}
        <NavLink
          to="/recruiter/profile"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <UserRound size={19} />
          <span>Profile</span>
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;