import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://13.201.18.238:5000/api/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    'All',
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses
    .filter(
      (course) =>
        selectedCategory === 'All' || course.category === selectedCategory
    )
    .filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Explore Our Courses</h1>
        <p>Discover the perfect course to advance your skills</p>
      </div>

      <div className="search-filter-container">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <span className="filter-icon">📊</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course, index) => (
          <div key={index} className="course-card">
            {course.videoUrl && (
              <div className="video-container">
                {course.videoUrl.includes('youtube.com') ||
                course.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={course.videoUrl.replace('watch?v=', 'embed/')}
                    title={course.name}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls>
                    <source src={course.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            <div className="course-content">
              <span className="course-category">{course.category}</span>

              <h3 className="course-title">{course.name}</h3>

              <p className="course-description">{course.description}</p>

              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span>{course.duration}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span>${course.price}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">👨‍🏫</span>
                  <span>{course.instructor}</span>
                </div>
              </div>

              <button className="enroll-button">
                <span className="button-icon">📚</span>
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-courses">
          <p>No courses found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
