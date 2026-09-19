import "./recruiterprofile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterProfile() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    location: "",
    preferredRole: "",
    experience: "",
    skills: "",
    linkedin: "",
    about: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // =========================================================
  // GET RECRUITER PROFILE
  // =========================================================

  useEffect(() => {

    const fetchProfile = async () => {

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
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          company: data.company || "",
          phone: data.phone || "",
          location: data.location || "",
          preferredRole: data.preferredRole || "",
          experience: data.experience || "",
          skills: data.skills || "",
          linkedin: data.linkedin || "",
          about: data.about || "",
        });

      } catch (error) {

        console.error("Profile Error:", error);

        setMessage("Failed to load profile.");

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, [token, navigate]);


  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({

            name: profile.name,

            company: profile.company,

            phone: profile.phone,

            location: profile.location,

            preferredRole: profile.preferredRole,

            experience: profile.experience,

            skills: profile.skills,

            linkedin: profile.linkedin,

            about: profile.about,

          }),
        }
      );

      if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
          errorText || "Failed to update profile"
        );

      }

      const data = await response.json();

      setProfile({
        name: data.name || "",
        email: data.email || "",
        company: data.company || "",
        phone: data.phone || "",
        location: data.location || "",
        preferredRole: data.preferredRole || "",
        experience: data.experience || "",
        skills: data.skills || "",
        linkedin: data.linkedin || "",
        about: data.about || "",
      });

      setMessage("Profile updated successfully.");

    } catch (error) {

      console.error("Update Error:", error);

      setMessage(
        error.message || "Failed to update profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="recruiter-profile-loading">

        <div className="profile-loading-spinner"></div>

        <p>Loading profile...</p>

      </div>
    );

  }


  // =========================================================
  // FIRST LETTER
  // =========================================================

  const firstLetter = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "R";


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div className="recruiter-profile-page">

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="recruiter-profile-content">


        {/* BACK BUTTON */}

        <button
          className="back-dashboard-button"
          onClick={() => navigate("/recruiter/dashboard")}
        >
          ← Back to Dashboard
        </button>


        {/* ===================================================
            PROFILE INTRO
        ==================================================== */}

        <section className="profile-intro-card">


          <div className="profile-intro-left">


            <div className="large-profile-letter">

              {firstLetter}

            </div>


            <div className="profile-intro-details">

              <h1>
                {profile.name || "Recruiter"}
              </h1>


              <p>
                {profile.preferredRole ||
                  "Recruiter"}
              </p>


              <span>
                {profile.company ||
                  "Company not added"}
              </span>

            </div>

          </div>


          <div className="recruiter-badge">

            Recruiter

          </div>


        </section>


        {/* ===================================================
            PROFILE FORM
        ==================================================== */}

        <form
          className="recruiter-profile-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}

          <section className="profile-section">

            <div className="section-heading">

              <h2>Personal Information</h2>

              <p>
                Keep your contact information up to date.
              </p>

            </div>


            <div className="profile-grid">


              {/* NAME */}

              <div className="profile-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="profile-field">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="readonly-field"
                />

                <small>
                  Your registered email cannot be changed.
                </small>

              </div>


              {/* PHONE */}

              <div className="profile-field">

                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>


              {/* LOCATION */}

              <div className="profile-field">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                />

              </div>

            </div>

          </section>


          {/* =================================================
              COMPANY INFORMATION
          ================================================== */}

          <section className="profile-section">

            <div className="section-heading">

              <h2>Company Information</h2>

              <p>
                Tell candidates about the company you
                represent.
              </p>

            </div>


            <div className="profile-grid">


              {/* COMPANY */}

              <div className="profile-field">

                <label>
                  Company Name
                  <span className="required-star">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  placeholder="e.g. Infosys"
                  required
                />

              </div>


              {/* JOB TITLE */}

              <div className="profile-field">

                <label>
                  Job Title
                </label>

                <input
                  type="text"
                  name="preferredRole"
                  value={profile.preferredRole}
                  onChange={handleChange}
                  placeholder="e.g. Talent Acquisition Specialist"
                />

              </div>


              {/* EXPERIENCE */}

              <div className="profile-field">

                <label>
                  Recruitment Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 Years"
                />

              </div>


              {/* SKILLS */}

              <div className="profile-field">

                <label>
                  Recruitment Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="e.g. Hiring, HR, Talent Acquisition"
                />

              </div>

            </div>

          </section>


          {/* =================================================
              ABOUT
          ================================================== */}

          <section className="profile-section">

            <div className="section-heading">

              <h2>About</h2>

              <p>
                Introduce yourself and your recruitment
                experience.
              </p>

            </div>


            <div className="profile-field full-width">

              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                placeholder="Write a short introduction about yourself and your role..."
                rows="6"
              />

            </div>

          </section>


          {/* =================================================
              PROFESSIONAL LINK
          ================================================== */}

          <section className="profile-section">

            <div className="section-heading">

              <h2>Professional Profile</h2>

              <p>
                Add your professional networking profile.
              </p>

            </div>


            <div className="profile-field">

              <label>
                LinkedIn
              </label>

              <input
                type="text"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
              />

            </div>

          </section>


          {/* =================================================
              MESSAGE
          ================================================== */}

          {message && (

            <div
              className={
                message.includes("successfully")
                  ? "profile-message success"
                  : "profile-message error"
              }
            >

              {message}

            </div>

          )}


          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="profile-form-actions">


            <button
              type="button"
              className="cancel-profile-button"
              onClick={() =>
                navigate("/recruiter/dashboard")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-profile-button"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save Profile"}

            </button>

          </div>


        </form>

      </main>

    </div>

  );
}

export default RecruiterProfile;