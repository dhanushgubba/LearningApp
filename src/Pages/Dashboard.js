import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-title">
          <h1>Welcome, Mr. 2200030302!</h1>
          <p>Your journey of knowledge continues. Keep pushing your limits!</p>
          <blockquote className="quote">
            "The beautiful thing about learning is that no one can take it away
            from you."
            <span>— B.B. King</span>
          </blockquote>
        </div>
        <div className="dashboard-cards">
          <div className="card progress-card">
            <h3>Learning Progress</h3>
            <p>75% of current course completed</p>
            <progress value="75" max="100"></progress>
            <button>View Progress</button>
          </div>
          <div className="card course-card">
            <h3>Upcoming Courses</h3>
            <p>Stay ahead! Enroll in the latest courses.</p>
            <button>Explore Now</button>
          </div>
          <div className="card achievement-card">
            <h3>Achievements</h3>
            <p>Congratulations! You've completed 5 courses.</p>
            <button>View Achievements</button>
          </div>
        </div>
        <div className="cta-section">
          <h2>Ready to Learn Something New?</h2>
          <p>Discover trending courses and master new skills.</p>
          <button className="cta-button">Start Learning</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
