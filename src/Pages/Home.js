import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to LearningHub</h1>
        <p>Discover and share knowledge with a community of learners.</p>
        <button className="cta-button">
          <Link to="/login">Get Started Here</Link>
        </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>Interactive Courses</h2>
          <p>Engage with interactive lessons and quizzes.</p>
        </div>
        <div className="feature-card">
          <h2>Expert Tutors</h2>
          <p>Learn from industry experts and experienced educators.</p>
        </div>
        <div className="feature-card">
          <h2>Community Support</h2>
          <p>Join discussions and connect with fellow learners.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About LearningHub</h2>
        <p>
          LearningHub is your gateway to interactive and engaging education. Our
          platform is designed to cater to learners of all ages, providing
          access to expert tutors, community discussions, and a wealth of
          knowledge.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>
            "LearningHub transformed my learning experience. The interactive
            courses are amazing!"
          </p>
          <h4>- John Doe</h4>
        </div>
        <div className="testimonial-card">
          <p>
            "The community support and expert tutors are the best. Highly
            recommend!"
          </p>
          <h4>- Jane Smith</h4>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>Join our community today and gain access to a world of knowledge.</p>
        <button className="cta-button">Join Now</button>
      </section>

      <footer className="footer">
        <p>&copy; 2025 LearningHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
