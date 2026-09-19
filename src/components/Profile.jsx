import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({

    name: "",
    email: "",
    phone: "",
    location: "",
    college: "",
    degree: "",
    skills: "",
    preferredRole: "",
    experience: "",
    resumeLink: "",
    github: "",
    linkedin: "",
    about: ""

  });


  // =========================================================
  // FETCH PROFILE
  // =========================================================

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
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = response.data;

      setProfile({
  name: data.name || "",
  email: data.email || "",
  phone: data.phone || "",
  location: data.location || "",
  college: data.college || "",
  degree: data.degree || "",
  skills: data.skills || "",
  preferredRole: data.preferredRole || "",
  experience: data.experience || "",
  resumeLink: data.resumeLink || "",
  github: data.github || "",
  linkedin: data.linkedin || "",
  about: data.about || ""
});


      // Check whether all profile details are filled

      const completed =
        data.phone &&
        data.location &&
        data.college &&
        data.degree &&
        data.skills &&
        data.preferredRole &&
        data.experience &&
        data.resumeLink &&
        data.github &&
        data.linkedin &&
        data.about;


      if (completed) {

        // Profile already completed
        // Show Edit button

        setEditMode(false);

      } else {

        // Profile incomplete
        // Show Save button

        setEditMode(true);

      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {

        localStorage.clear();

        navigate("/login");

      } else {

        setLoading(false);

      }

    }

  };


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((prev) => ({

      ...prev,

      [name]: value

    }));

  };


  // =========================================================
  // VALIDATION
  // =========================================================

  const validate = () => {

  if (
    !profile.name?.trim() ||
    !profile.phone?.trim() ||
    !profile.location?.trim() ||
    !profile.college?.trim() ||
    !profile.degree?.trim() ||
    !profile.skills?.trim() ||
    !profile.preferredRole?.trim() ||
    !profile.experience?.trim() ||
    !profile.resumeLink?.trim() ||
    !profile.github?.trim() ||
    !profile.linkedin?.trim() ||
    !profile.about?.trim()
  ) {
    alert("Please fill all fields.");
    return false;
  }

  if (!/^[0-9]{10}$/.test(profile.phone)) {
    alert("Phone Number must contain exactly 10 digits.");
    return false;
  }

  return true;
};


  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = async () => {

    if (!validate()) return;

    try {

      await axios.put(
        "http://localhost:8080/api/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      alert("Profile Saved Successfully!");


      // IMPORTANT:
      // Save button changes to Edit button

      setEditMode(false);

    } catch (err) {

      console.log(err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {

        localStorage.clear();

        alert("Session Expired. Please Login Again.");

        navigate("/login");

      } else {

        alert("Unable to save profile.");

      }

    }

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="profile-loading">

        <h2>
          Loading Profile...
        </h2>

      </div>

    );

  }


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="profile-page">


      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="profile-navbar">

        <h1
          className="logo"
          onClick={() => navigate("/home")}
        >

          Career<span>Nest</span>

        </h1>

      </nav>


      {/* =====================================================
          BACK BUTTON
          ===================================================== */}

      <button
        className="back-arrow"
        onClick={() => navigate("/home")}
        aria-label="Back to Home"
      >

        <ArrowLeft size={22} />

      </button>


      {/* =====================================================
          PROFILE HEADER
          ===================================================== */}

      <div className="profile-header">

        <div className="avatar">

          {profile.name
            ? profile.name.charAt(0).toUpperCase()
            : "U"}

        </div>


        <h2>
          {profile.name || "Your Name"}
        </h2>


        <p>
          {profile.email}
        </p>

      </div>


      {/* =====================================================
          PROFILE CARD
          ===================================================== */}

      <div className="profile-card">

        <h2>
          User Profile
        </h2>


        <div className="form-grid">


          {/* FULL NAME */}

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter your full name"
            />

          </div>


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
            />

          </div>


          {/* PHONE */}

          <div className="input-group">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter phone number"
            />

          </div>


          {/* LOCATION */}

          <div className="input-group">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter your location"
            />

          </div>


          {/* COLLEGE */}

          <div className="input-group">

            <label>
              College
            </label>

            <input
              type="text"
              name="college"
              value={profile.college}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter college name"
            />

          </div>


          {/* DEGREE */}

          <div className="input-group">

            <label>
              Degree
            </label>

            <input
              type="text"
              name="degree"
              value={profile.degree}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter degree"
            />

          </div>


          {/* SKILLS */}

          <div className="input-group">

            <label>
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Java, React, Spring Boot..."
            />

          </div>


          {/* PREFERRED ROLE */}

          <div className="input-group">

            <label>
              Preferred Role
            </label>

            <input
              type="text"
              name="preferredRole"
              value={profile.preferredRole}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Frontend Developer"
            />

          </div>


          {/* EXPERIENCE */}

          <div className="input-group">

            <label>
              Experience
            </label>

            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Fresher / 1 Year"
            />

          </div>


          {/* RESUME LINK */}

          <div className="input-group">

            <label>
              Resume Link
            </label>

            <input
              type="url"
              name="resumeLink"
              value={profile.resumeLink}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="https://..."
            />

          </div>


          {/* GITHUB */}

          <div className="input-group">

            <label>
              GitHub
            </label>

            <input
              type="url"
              name="github"
              value={profile.github}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="https://github.com/username"
            />

          </div>


          {/* LINKEDIN */}

          <div className="input-group">

            <label>
              LinkedIn
            </label>

            <input
              type="url"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="https://linkedin.com/in/username"
            />

          </div>


        </div>


        {/* ===================================================
            ABOUT
            =================================================== */}

        <div className="input-group textarea">

          <label>
            About Yourself
          </label>

          <textarea
            rows="5"
            name="about"
            value={profile.about}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Write a short introduction about yourself..."
          />

        </div>


        {/* ===================================================
            SAVE / EDIT BUTTON
            =================================================== */}

        <div className="button-section">

          {editMode ? (

            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
            >

              Save Profile

            </button>

          ) : (

            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >

              Edit Profile

            </button>

          )}

        </div>


      </div>

    </div>

  );

}

export default Profile;