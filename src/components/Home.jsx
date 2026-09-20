import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from "./Chatbot";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("recruiterName");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="home-container">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="nav-left">
          <h2
            className="logo"
            onClick={() => navigate("/home")}
          >
            Career<span>Nest</span>
          </h2>
        </div>


        {/* ================= DESKTOP NAV ================= */}

        <div className="nav-right">

          <button
            className="nav-link-btn"
            onClick={() => navigate("/jobs")}
          >
            Jobs
          </button>

          <button
            className="nav-link-btn"
            onClick={() => navigate("/about")}
          >
            About
          </button>

          <button
            className="nav-link-btn"
            onClick={() => navigate("/applications")}
          >
            Application Tracking
          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

          <div className="profile-ai">

            <div
              className="profile-circle"
              title="My Profile"
              onClick={() => navigate("/profile")}
            >
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "N"}
            </div>

            <ChatBot />

          </div>

        </div>


        {/* ================= MOBILE HAMBURGER ================= */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </nav>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div className="mobile-menu">

          <button
            onClick={() => {
              navigate("/jobs");
              closeMenu();
            }}
          >
            Jobs
          </button>

          <button
            onClick={() => {
              navigate("/about");
              closeMenu();
            }}
          >
            About
          </button>

          <button
            onClick={() => {
              navigate("/applications");
              closeMenu();
            }}
          >
            Application Tracking
          </button>

          <button
            onClick={() => {
              navigate("/profile");
              closeMenu();
            }}
          >
            My Profile
          </button>

          <button
            className="mobile-logout"
            onClick={() => {
              closeMenu();
              logout();
            }}
          >
            Logout
          </button>

        </div>
      )}


      {/* ================= HERO SECTION ================= */}

      <section className="hero-section">

        <h1>
          Find Your <span>Dream Job</span>
        </h1>

        <p>
          Build your future with opportunities
          that match your skills and passion.
        </p>

      </section>


      {/* ================= FEATURE CARDS ================= */}

      <section className="cards-container">

        <div
          className="feature-card clickable-card"
          onClick={() => navigate("/profile")}
        >
          <h3>
            Complete Your Profile
          </h3>

          <p>
            Tell us about your skills,
            education and preferences
            to get better job recommendations.
          </p>
        </div>


        <div
          className="feature-card clickable-card"
          onClick={() => navigate("/jobs")}
        >
          <h3>
            Explore Jobs
          </h3>

          <p>
            Browse jobs from top companies
            that match your profile and interests.
          </p>
        </div>


        <div
          className="feature-card clickable-card"
          onClick={() => navigate("/applications")}
        >
          <h3>
            Application Tracking
          </h3>

          <p>
            Track all your applied jobs
            in one place.
          </p>
        </div>

      </section>


      {/* ================= ABOUT CAREERNEST ================= */}

      <section className="about-careernest-section">

        <div className="about-icon">
          ⓘ
        </div>

        <div className="about-content">

          <h2>
            About CareerNest
          </h2>

          <p>
            We help job seekers build strong profiles and connect
            with opportunities that truly fit their skills and goals.
          </p>

        </div>

        <button
          className="about-learn-btn"
          onClick={() => navigate("/about")}
        >
          Learn More
          <span>→</span>
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>
        © 2025 CareerNest. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;