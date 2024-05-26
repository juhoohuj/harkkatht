import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewProject from "./NewProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects", { withCredentials: true });
        setProjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div>
      <h1>Projektit</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      <NewProject onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default Projects;
