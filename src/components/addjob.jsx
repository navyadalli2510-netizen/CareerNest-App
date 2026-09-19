import "./addJob.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    aboutJob: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    experience: "",
    education: "",
    salary: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setJob((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // ==============================
  // ADD JOB
  // ==============================

const handleSubmit = async (e) => {

  e.preventDefault();

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token) {
    alert("JWT token not found. Please login again.");
    navigate("/login");
    return;
  }

  setLoading(true);
  setMessage("");

  try {

    const response = await fetch(
      "http://localhost:8080/api/jobs",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(job)
      }
    );

    console.log("STATUS:", response.status);

    const responseText = await response.text();

    console.log("BACKEND RESPONSE:", responseText);

    if (!response.ok) {
      throw new Error(responseText || "Failed to add job");
    }

    const savedJob = JSON.parse(responseText);

    console.log("SAVED JOB:", savedJob);

    alert("Job added successfully!");

    navigate("/recruiter/jobs");

  } catch (error) {

    console.error("ADD JOB ERROR:", error);

    alert("Failed to add job: " + error.message);

    setMessage(error.message);

  } finally {

    setLoading(false);

  }
};


  return (

    <div className="add-job-page">

      {/* ================= HEADER ================= */}

      <header className="add-job-header">

        <div
          className="add-job-logo"
          onClick={() =>
            navigate("/recruiter/dashboard")
          }
        >
          CareerNest
        </div>

        <button
          className="add-job-back"
          onClick={() =>
            navigate("/recruiter/jobs")
          }
        >
          ← Back to Jobs
        </button>

      </header>


      {/* ================= CONTENT ================= */}

      <main className="add-job-content">

        <div className="add-job-title">

          <h1>Add New Job</h1>

          <p>
            Create a new job opportunity for candidates.
          </p>

        </div>


        <form
          className="add-job-form"
          onSubmit={handleSubmit}
        >


          {/* ================= JOB INFORMATION ================= */}

          <section className="add-job-section">

            <h2>Job Information</h2>


            <div className="add-job-grid">


              {/* TITLE */}

              <div className="add-job-field">

                <label>Job Title *</label>

                <input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  placeholder="Java Developer"
                  required
                />

              </div>


              {/* COMPANY */}

              <div className="add-job-field">

                <label>Company *</label>

                <input
                  type="text"
                  name="company"
                  value={job.company}
                  onChange={handleChange}
                  placeholder="Infosys"
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="add-job-field">

                <label>Location *</label>

                <input
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="Hyderabad"
                  required
                />

              </div>


              {/* JOB TYPE */}

              <div className="add-job-field">

                <label>Job Type *</label>

                <select
                  name="type"
                  value={job.type}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Job Type
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                  <option value="Remote">
                    Remote
                  </option>

                </select>

              </div>


              {/* EXPERIENCE */}

              <div className="add-job-field">

                <label>Experience *</label>

                <input
                  type="text"
                  name="experience"
                  value={job.experience}
                  onChange={handleChange}
                  placeholder="2 Years"
                  required
                />

              </div>


              {/* EDUCATION */}

              <div className="add-job-field">

                <label>Education *</label>

                <input
                  type="text"
                  name="education"
                  value={job.education}
                  onChange={handleChange}
                  placeholder="B.Tech"
                  required
                />

              </div>


              {/* SALARY */}

              <div className="add-job-field">

                <label>Salary</label>

                <input
                  type="text"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  placeholder="12 LPA"
                />

              </div>


              {/* SKILLS */}

              <div className="add-job-field">

                <label>Skills *</label>

                <input
                  type="text"
                  name="skills"
                  value={job.skills}
                  onChange={handleChange}
                  placeholder="Java, Spring Boot, MySQL"
                  required
                />

              </div>

            </div>

          </section>


          {/* ================= DESCRIPTION ================= */}

          <section className="add-job-section">

            <h2>Job Description</h2>


            <div className="add-job-field full">

              <label>
                Description *
              </label>

              <textarea
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Enter a short description of the job"
                rows="4"
                required
              />

            </div>


            <div className="add-job-field full">

              <label>
                About Job
              </label>

              <textarea
                name="aboutJob"
                value={job.aboutJob}
                onChange={handleChange}
                placeholder="Explain the job in detail"
                rows="5"
              />

            </div>

          </section>


          {/* ================= RESPONSIBILITIES ================= */}

          <section className="add-job-section">

            <h2>
              Responsibilities & Requirements
            </h2>


            <div className="add-job-field full">

              <label>
                Responsibilities
              </label>

              <textarea
                name="responsibilities"
                value={job.responsibilities}
                onChange={handleChange}
                placeholder="Enter job responsibilities"
                rows="5"
              />

            </div>


            <div className="add-job-field full">

              <label>
                Requirements
              </label>

              <textarea
                name="requirements"
                value={job.requirements}
                onChange={handleChange}
                placeholder="Enter candidate requirements"
                rows="5"
              />

            </div>

          </section>


          {/* ================= MESSAGE ================= */}

          {message && (

            <div
              className={
                message.includes("successfully")
                  ? "add-job-message success"
                  : "add-job-message error"
              }
            >
              {message}
            </div>

          )}


          {/* ================= BUTTONS ================= */}

          <div className="add-job-actions">

            <button
              type="button"
              className="cancel-job-button"
              onClick={() =>
                navigate("/recruiter/jobs")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-job-button"
              disabled={loading}
            >

              {loading
                ? "Posting..."
                : "Post Job"}

            </button>

          </div>


        </form>

      </main>

    </div>

  );

}

export default AddJob;