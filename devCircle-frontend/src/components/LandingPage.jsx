import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LandingPage = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/feed");
  }, [user]);
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Floating cards decoration */}
        <div className="floating-card floating-card-left">
          <div className="float-card-inner">
            <div className="float-card-tag">👨‍💻 Developers</div>
            <p>Connect with like-minded developers worldwide</p>
            <div className="float-card-bar" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="floating-card floating-card-right">
          <div className="float-card-inner">
            <div className="float-icon">🔔</div>
            <strong>New Connection</strong>
            <p>Sarah J. sent you a request</p>
            <span className="float-time">Just now · 09:00 - 09:15</span>
          </div>
        </div>

        {/* Main hero content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            The Developer Network
          </div>
          <h1 className="hero-title">
            Connect, collaborate,
            <br />
            <span className="hero-title-muted">and grow together</span>
          </h1>
          <p className="hero-subtitle">
            DevCircle helps you discover developers, build meaningful connections,
            and accelerate your career.
          </p>
          <div className="hero-cta-group">
            <Link to="/login" className="btn-hero-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-hero-secondary">
              Sign In
            </Link>
          </div>
          <p className="hero-disclaimer">No credit card required · Free forever plan</p>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <strong>10K+</strong>
            <span>Developers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>50K+</strong>
            <span>Connections Made</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>120+</strong>
            <span>Countries</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>4.9★</strong>
            <span>User Rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-label">WHY DEVCIRCLE</span>
          <h2 className="section-title">Everything you need to grow</h2>
          <p className="section-sub">Built for developers, by developers</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "linear-gradient(135deg, #e0f2fe, #bae6fd)" }}>🤝</div>
            <h3>Smart Matching</h3>
            <p>Get matched with developers who share your skills, interests, and career goals through our intelligent algorithm.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "linear-gradient(135deg, #fef9c3, #fde68a)" }}>💬</div>
            <h3>Real-time Chat</h3>
            <p>Chat instantly with your connections. Share code snippets, ideas, and collaborate on exciting projects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}>🚀</div>
            <h3>Career Growth</h3>
            <p>Find mentors, collaborators, and job opportunities. Your next big break might be one connection away.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "linear-gradient(135deg, #fce7f3, #fbcfe8)" }}>⭐</div>
            <h3>Premium Access</h3>
            <p>Unlock unlimited connections, priority discovery, and exclusive networking events with Premium.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to find your dev circle?</h2>
          <p>Join thousands of developers who are already building connections that matter.</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn-hero-primary">
              Create Free Account
            </Link>
            <Link to="/login" className="btn-cta-outline">
              Sign In →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
