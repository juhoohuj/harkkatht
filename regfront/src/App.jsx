import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
