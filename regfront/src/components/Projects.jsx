import { useState, useEffect } from "react";
import axios from "axios";

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
  } , []);

  return (
    <div>
      <h1>Projektit</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;