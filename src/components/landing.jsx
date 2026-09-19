import "./landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="logo">
          Career<span>Nest</span>
        </h1>

        <p className="subtitle">
          Find jobs that match your skills, powered by smart
          <br />
          recommendations
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;