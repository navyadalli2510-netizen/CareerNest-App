import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./forgot.css";

function Forgot() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const role = localStorage.getItem("role");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.email ||
      !form.newPassword ||
      !form.confirmPassword
    ) {

      alert("Please fill all fields.");
      return;

    }

    if (form.newPassword !== form.confirmPassword) {

      alert("Passwords do not match.");
      return;

    }

    try {

      await axios.put(
        "http://localhost:8080/auth/reset-password",
        {
          email: form.email,
          newPassword: form.newPassword
        }
      );

      alert("Password Reset Successfully");

      navigate("/login");

    }

    catch (err) {

      console.log(err);

      if (err.response?.status === 404) {

        alert("Email not found");

      }

      else {

        alert("Unable to reset password");

      }

    }

  };
    return (

    <div className="forgot-container">

      <div className="forgot-card">

        <div className="logo-section">

          <h1 className="logo">
            Career<span>Nest</span>
          </h1>

          <h2>Forgot Password</h2>

          <p>
            Enter your registered email and create a new password.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={form.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="reset-btn"
          >
            Reset Password
          </button>

          <div className="login-link">

            Remember your password?

            <Link to="/login">
              Login
            </Link>

          </div>

        </form>

      </div>

    </div>

  );

}

export default Forgot;