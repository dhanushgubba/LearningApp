import React, { useState } from 'react';
import './AddCourses.css';

const AddCourses = () => {
  const [course, setCourse] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    instructor: '',
    videoUrl: '',
  });

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Health',
    'Languages',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://43.204.234.158:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        alert('Course added successfully!');
        setCourse({
          name: '',
          description: '',
          category: '',
          duration: '',
          price: '',
          instructor: '',
          videoUrl: '',
        });
      } else {
        alert('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        'An error occurred while trying to add the course. Please try again later.'
      );
    }
  };

  return (
    <div className="addcourses-container">
      <h1 className="addcourses-title">Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Course Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter the course name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter course description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={course.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="duration">Duration:</label>
          <input
            id="duration"
            type="text"
            name="duration"
            placeholder="Enter course duration (e.g., 6 weeks)"
            value={course.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Enter course price"
            value={course.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="instructor">Instructor:</label>
          <input
            id="instructor"
            type="text"
            name="instructor"
            placeholder="Enter instructor's name"
            value={course.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            id="videoUrl"
            type="url"
            name="videoUrl"
            placeholder="Enter URL for course video"
            value={course.videoUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourses;
