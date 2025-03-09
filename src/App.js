import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import UserNavbar from './componenets/UserNavbar';
import Navbar from './componenets/Navbar';
import Courses from './Pages/Courses';
import AdminLogin from './Pages/AdminLogin';
import BCourses from './Pages/BCourses';
import AdminHome from './Pages/AdminHome';
import AdminNavbar from './componenets/AdminNavbar';
import PrivateRoute from './componenets/PrivateRoute'; // Import PrivateRoute
import ViewAllUsers from './Pages/ViewAllUsers';
import AddUsers from './Pages/AddUsers';
import AddCourses from './Pages/AddCourses';
import Feedback from './Pages/Feedback';

const App = () => {
  const Layout = () => {
    const [courses, setCourses] = useState([]);
    const location = useLocation();
    const showNavbar = [
      '/',
      '/login',
      '/register',
      '/adminlogin',
      '/mcourses',
    ].includes(location.pathname);
    const showUserNavbar = ['/dashboard', '/courses', '/feedback'].includes(
      location.pathname
    );
    const showAdminNavbar = [
      '/adminhome',
      '/viewallusers',
      '/addusers',
      '/addcourses',
    ].includes(location.pathname);

    return (
      <>
        {showNavbar && <Navbar />}
        {showUserNavbar && <UserNavbar />}
        {showAdminNavbar && <AdminNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={<Courses courses={courses} setCourses={setCourses} />}
          />
          <Route path="/mcourses" element={<BCourses />} />

          {/* Protecting /adminhome route */}
          <Route
            path="/adminhome"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/viewallusers"
            element={
              <PrivateRoute>
                <ViewAllUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/addusers"
            element={
              <PrivateRoute>
                <AddUsers />
              </PrivateRoute>
            }
          />
          <Route path="/addcourses" element={<AddCourses />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
