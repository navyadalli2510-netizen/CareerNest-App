import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/auth/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
          role
        }),

      });

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message);
      }

      alert(message);

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>Register</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


         <div className="role-section">

  <p className="role-title">Register As</p>

  <label className="radio-option">

    <input
      type="radio"
      name="role"
      value="ROLE_USER"
      checked={role === "ROLE_USER"}
      onChange={(e) => setRole(e.target.value)}
    />

    User

  </label>

  <label className="radio-option">

    <input
      type="radio"
      name="role"
      value="ROLE_RECRUITER"
      checked={role === "ROLE_RECRUITER"}
      onChange={(e) => setRole(e.target.value)}
    />

    Recruiter

  </label>

</div>

          <button type="submit">
            Register
          </button>
        </form>

      </div>

    </div>

  );

}

export default Register;