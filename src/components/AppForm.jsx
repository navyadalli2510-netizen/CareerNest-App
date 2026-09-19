import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import "./AppForm.css";

function AppForm() {

  const navigate = useNavigate();
  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    experience: "",
    resumeLink: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!jobId) {
    alert("Job ID is missing.");
    return;
  }

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  console.log("TOKEN =", token);

  if (!token) {
    alert("Please Login First");
    navigate("/login");
    return;
  }

  try {

    const response = await axios.post(

      `http://localhost:8080/api/applications/apply-job/${jobId}`,

      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }

    );

    console.log(response.data);

    alert("Application Submitted Successfully!");

    navigate("/applications");

  } catch (error) {

    console.error(error);

    console.log(error.response);

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {

      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      alert("Session Expired. Please Login Again.");

      navigate("/login");

    } else {

      alert("Failed to submit application");

    }

  }

};

  return (
    <div className="app-form-container">
      <nav className="profile-navbar">

        <h1
          className="logo"
          onClick={() => navigate("/home")}
        >
          Career<span>Nest</span>
        </h1>

      </nav>

      <button
  className="back-arrow"
  onClick={() => navigate("/home")}
  aria-label="Back to Home"
>
  <ArrowLeft size={22} />
</button>

      <div className="app-form-card">

        <div className="form-header">
          <h1>Apply for this Job</h1>
          <p>Complete the form below to submit your application.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Current location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Highest Qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="0-2 Years"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Resume Link</label>
            <input
              type="url"
              name="resumeLink"
              placeholder="Paste Resume Link"
              value={formData.resumeLink}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="5"
              name="message"
              placeholder="Tell us why you are interested..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="submit-btn"
            >
              Submit Application
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default AppForm;