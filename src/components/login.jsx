import "./Login.css";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login Successful");

      if (data.role === "ROLE_USER") {
        navigate("/home");
      } else {
        navigate("/recruiter/dashboard");
      }

    } catch (err) {

      alert(err.message);

    }

  };

  return (

    <div className="login-page">

      <div className="login-container">

        {/* LEFT SIDE */}

        <div className="left-panel">

          <div className="left-content">

            <h1>WELCOME</h1>

            <h3>CareerNest</h3>

            <p>
              Find your dream job, build your profile,
              apply to companies and track your
              applications—all in one place.
            </p>

          </div>

          <div className="circle big-circle"></div>

          <div className="circle small-circle"></div>

        </div>


        {/* RIGHT SIDE */}

        <div className="right-panel">

          <div className="login-box">

            <h2>Sign In</h2>

            <p className="subtitle">
              Login to continue your journey.
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="input-box">

                <Mail className="input-icon" size={18} />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="input-box">

                <Lock className="input-icon" size={18} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <span
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "HIDE"
                    : "SHOW"}
                </span>

              </div>


              {/* OPTIONS */}

              <div className="login-options">

                <label>

                  <input type="checkbox" />

                  <span>Remember Me</span>

                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>


              {/* LOGIN BUTTON */}

              <button
                className="login-btn"
                type="submit"
              >
                Sign In
              </button>


              {/* DIVIDER */}

              <div className="divider">

                <span>OR</span>

              </div>


              {/* REGISTER */}

              <p className="register-text">

                Don't have an account?

                <Link to="/register">
                  Sign Up
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;