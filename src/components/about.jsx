import "./about.css";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  UserRound,
  FileCheck2,
  Target,
  UsersRound,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* ================= NAVBAR ================= */}

      <nav className="about-navbar">

        <div className="about-logo-area">

          <div
            className="about-logo"
            onClick={() => navigate("/home")}
          >
            Career<span>Nest</span>
          </div>

        </div>
          <button
            className="back-arrow"
            onClick={() => navigate("/home")}
            aria-label="Back to Home"
          >
            <ArrowLeft size={21} />
          </button>

        <div className="about-nav-links">

          <button onClick={() => navigate("/home")}>
            Home
          </button>

          <button onClick={() => navigate("/jobs")}>
            Jobs
          </button>

          <button className="active">
            About
          </button>

          <button
            onClick={() => navigate("/applications")}
          >
            Application Tracking
          </button>

          <button
            className="about-profile-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-small-title">
            ABOUT CAREERNEST
          </span>

          <h1>
            Building Your Path
            <br />
            To A <span>Better Career</span>
          </h1>

          <p>
            CareerNest is a job portal designed to connect job seekers
            with meaningful career opportunities while helping recruiters
            discover suitable candidates.
          </p>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="about-intro">

        <div className="about-intro-text">

          <span className="section-label">
            OUR PLATFORM
          </span>

          <h2>
            Your Career Journey,
            <br />
            <span>All In One Place.</span>
          </h2>

          <p>
            Finding the right job should be simple, organized and
            personalized. CareerNest brings job discovery, profile
            management, applications and application tracking together
            in one platform.
          </p>

          <p>
            Candidates can create their profile, explore available jobs,
            apply for suitable positions and track their applications.
            Recruiters can manage job postings and view applications
            from candidates.
          </p>

        </div>


        <div className="about-intro-card">

          <div className="intro-icon">
            <Target size={30} />
          </div>

          <h3>
            Our Goal
          </h3>

          <p>
            To make the job search process easier for candidates and
            candidate management simpler for recruiters.
          </p>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <span className="section-label">
            WHAT CAREERNEST OFFERS
          </span>

          <h2>
            Everything You Need
            <br />
            For Your <span>Career Journey</span>
          </h2>

        </div>


        <div className="about-feature-grid">

          {/* CARD 1 */}

          <div className="about-feature-card">

            <div className="feature-icon blue">
              <BriefcaseBusiness size={27} />
            </div>

            <h3>
              Explore Jobs
            </h3>

            <p>
              Discover job opportunities based on your skills,
              interests and career preferences.
            </p>

            <button
              onClick={() => navigate("/jobs")}
            >
              Explore Jobs
              <ArrowRight size={17} />
            </button>

          </div>


          {/* CARD 2 */}

          <div className="about-feature-card">

            <div className="feature-icon purple">
              <UserRound size={27} />
            </div>

            <h3>
              Build Your Profile
            </h3>

            <p>
              Add your education, skills, experience and career
              preferences to create your professional profile.
            </p>

            <button
              onClick={() => navigate("/profile")}
            >
              My Profile
              <ArrowRight size={17} />
            </button>

          </div>


          {/* CARD 3 */}

          <div className="about-feature-card">

            <div className="feature-icon cyan">
              <FileCheck2 size={27} />
            </div>

            <h3>
              Track Applications
            </h3>

            <p>
              Keep track of the jobs you have applied for and
              monitor your application status in one place.
            </p>

            <button
              onClick={() => navigate("/applications")}
            >
              Track Applications
              <ArrowRight size={17} />
            </button>

          </div>


          {/* CARD 4 */}

          <div className="about-feature-card">

            <div className="feature-icon green">
              <UsersRound size={27} />
            </div>

            <h3>
              Recruiter Management
            </h3>

            <p>
              Recruiters can create job postings, manage their jobs
              and view applications from candidates.
            </p>

            <button
              onClick={() => navigate("/login")}
            >
              Get Started
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="about-how">

        <div className="about-section-heading">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Simple Steps To Start
            <br />
            Your <span>Career Journey</span>
          </h2>

        </div>


        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Create Your Profile
            </h3>

            <p>
              Add your skills, education, experience and
              career preferences.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>
              Explore Opportunities
            </h3>

            <p>
              Browse available jobs and find opportunities
              matching your interests.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Apply For Jobs
            </h3>

            <p>
              Submit your application with your professional
              details and resume.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <h3>
              Track Your Progress
            </h3>

            <p>
              Monitor your applications and stay updated
              about their status.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div>

          <span>
            READY TO TAKE THE NEXT STEP?
          </span>

          <h2>
            Start Building Your
            <br />
            <strong>Career Today.</strong>
          </h2>

          <p>
            Explore opportunities and take the next step
            towards your career goals.
          </p>

        </div>

        <button
          onClick={() => navigate("/jobs")}
        >
          Explore Jobs
          <ArrowRight size={19} />
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="about-footer">
        © 2026 CareerNest. All rights reserved.
      </footer>

    </div>
  );
}

export default About;