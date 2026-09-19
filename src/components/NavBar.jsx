import { useEffect, useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // STATE
  // =========================================================

  const [profileMenu, setProfileMenu] = useState(false);
  const [recruiterName, setRecruiterName] = useState("Recruiter");

  // =========================================================
  // GET PAGE TITLE
  // =========================================================

  const getPageTitle = () => {
    if (location.pathname.includes("/jobs")) {
      return "Jobs";
    }

    if (location.pathname.includes("/applicants")) {
      return "Applicants";
    }

    if (location.pathname.includes("/profile")) {
      return "Profile";
    }

    return "Dashboard";
  };

  // =========================================================
  // FETCH RECRUITER PROFILE FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      const token = localStorage.getItem("token");

      // No token -> login
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Profile API Status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch recruiter profile");
        }

        const data = await response.json();

        console.log("🔥 PROFILE API RESPONSE:", data);
        console.log("🔥 NAME FROM BACKEND:", data.name);

        // Get actual name from backend
        if (data.name && data.name.trim() !== "") {
          setRecruiterName(data.name);

          // Also save it locally for other pages if needed
          localStorage.setItem("recruiterName", data.name);
        } else {
          // Fallback
          const savedName =
            localStorage.getItem("recruiterName");

          setRecruiterName(
            savedName || "Recruiter"
          );
        }

      } catch (error) {
        console.error(
          "❌ PROFILE FETCH ERROR:",
          error
        );

        // If backend fails, use localStorage name
        const savedName =
          localStorage.getItem("recruiterName");

        setRecruiterName(
          savedName || "Recruiter"
        );
      }
    };

    fetchRecruiterProfile();
  }, [navigate]);

  // =========================================================
  // FIRST LETTER OF RECRUITER NAME
  // =========================================================

  const firstLetter =
    recruiterName &&
    recruiterName.trim().length > 0
      ? recruiterName.trim().charAt(0).toUpperCase()
      : "R";

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("recruiterName");

    navigate("/login");
  };

  // =========================================================
  // GO TO PROFILE
  // =========================================================

  const goToProfile = () => {
    setProfileMenu(false);
    navigate("/recruiter/profile");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <header className="recruiter-navbar">

      {/* =====================================================
          LEFT - PAGE TITLE
      ====================================================== */}

      <div className="navbar-title">
        {getPageTitle()}
      </div>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="navbar-right">

        {/* WELCOME */}
        <span className="navbar-welcome">
          Welcome, {recruiterName}
        </span>


        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="navbar-profile">

          <button
            type="button"
            className="navbar-profile-circle"
            onClick={() =>
              setProfileMenu(!profileMenu)
            }
          >
            {firstLetter}
          </button>


          {/* PROFILE DROPDOWN */}

          {profileMenu && (
            <div className="navbar-profile-menu">

              <button
                type="button"
                onClick={goToProfile}
              >
                <UserRound size={16} />

                <span>
                  Profile
                </span>
              </button>

            </div>
          )}

        </div>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          type="button"
          className="navbar-logout"
          onClick={handleLogout}
        >
          <LogOut size={16} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;