import React, { useState } from 'react';
import './BCourses.css'; // Make sure to include the CSS file

const allCourses = [
  {
    title: 'Web Development',
    category: 'Development',
    description:
      'Learn to build responsive websites using HTML, CSS, and JavaScript.',
    image:
      'https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg',
  },
  {
    title: 'Data Science',
    category: 'Data Science',
    description:
      'Master data analysis, visualization, and machine learning techniques.',
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/013/030/138/small/big-data-science-analysis-information-technology-concept-server-room-background-photo.jpg',
  },
  {
    title: 'Cloud Computing',
    category: 'Cloud',
    description:
      'Understand cloud architecture and deploy scalable applications.',
    image:
      'https://media.istockphoto.com/id/1399936043/photo/data-transfer-cloud-computing-technology-concept-there-is-a-large-prominent-cloud-icon-in-the.jpg?s=612x612&w=0&k=20&c=pSrIUkBc6Yf1gT7G0SnjQL4T-PjbC6KmFZavud7To2I=',
  },
  {
    title: 'Mobile App Development',
    category: 'Development',
    description: 'Create cross-platform mobile apps with React Native.',
    image:
      'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg',
  },
  {
    title: 'Machine Learning',
    category: 'Data Science',
    description: 'Dive deep into algorithms and build intelligent systems.',
    image:
      'https://media.istockphoto.com/id/966248982/photo/robot-with-education-hud.jpg?s=612x612&w=0&k=20&c=9eoZYRXNZsuU3edU87PksxN4Us-c9rB6IR7U_IGZ-U8=',
  },
  {
    title: 'Cybersecurity',
    category: 'Security',
    description: 'Protect systems and networks from cyber threats and attacks.',
    image:
      'https://t4.ftcdn.net/jpg/02/45/63/69/360_F_245636933_kY23ohGptK5t6n8wGSXIgLgVXWeHJRct.jpg',
  },
  {
    title: 'Artificial Intelligence',
    category: 'AI',
    description: 'Explore neural networks, NLP, and advanced AI models.',
    image:
      'https://img.freepik.com/free-photo/ai-technology-brain-background-digital-transformation-concept_53876-124672.jpg?semt=ais_hybrid',
  },
  {
    title: 'UI/UX Design',
    category: 'Design',
    description:
      'Create stunning user interfaces and enhance user experiences.',
    image:
      'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg',
  },
];

const BCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bcourses-container">
      <div className="bcourses-title">
        <h1>Courses Available at LearningHub</h1>
        <p>Explore our wide range of courses designed for all skill levels.</p>
      </div>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Categories</option>
          <option value="Development">Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cloud">Cloud</option>
          <option value="Design">UI/UX Design</option>
          <option value="Security">Security</option>
        </select>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course, index) => (
          <div key={index} className="course-card">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-content">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button className="learn-more">
                <a href="/login">Learn More</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BCourses;
