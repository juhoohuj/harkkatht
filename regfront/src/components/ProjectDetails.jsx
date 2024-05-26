import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NewTimeLog from "./NewTimeLog";
import EditTimeLog from "./EditTimeLog";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [userError, setUserError] = useState(null);
  const [userSuccess, setUserSuccess] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`, { withCredentials: true });
        setProject(response.data);
      } catch (err) {
        setError('Error fetching project');
        console.error(err);
      }
    };

    fetchProject();
  }, [id]);

  const handleTimeLogCreated = (newTimeLog) => {
    setProject((prevProject) => ({
      ...prevProject,
      time_logs: [...prevProject.time_logs, newTimeLog],
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setUserError(null);
    setUserSuccess(null);
    try {
      const response = await axios.post(`http://localhost:3000/projects/${id}/add_user`, { email }, { withCredentials: true });
      setUserSuccess('User added successfully');
      setProject((prevProject) => ({
        ...prevProject,
        users: [...prevProject.users, response.data.user],
      }));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setUserError(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.message) {
        setUserError(err.response.data.message);
      } else {
        setUserError('An error occurred. Please try again.');
      }
      console.error(err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`, { withCredentials: true });
      navigate('/projects');
    } catch (err) {
      setError('Error deleting project');
      console.error(err);
    }
  };

  const handleDeleteTimeLog = async (timeLogId) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}/time_logs/${timeLogId}`, { withCredentials: true });
      setProject((prevProject) => ({
        ...prevProject,
        time_logs: prevProject.time_logs.filter((log) => log.id !== timeLogId),
      }));
    } catch (err) {
      setError('Error deleting time log');
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <button onClick={handleDeleteProject}>Delete Project</button>
      <h2>Users</h2>
      <ul>
        {project.users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <form onSubmit={handleAddUser}>
        <input
          type="email"
          placeholder="User email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {userError && <p style={{ color: 'red' }}>{userError}</p>}
      {userSuccess && <p style={{ color: 'green' }}>{userSuccess}</p>}
      <h2>Time Logs</h2>
      <ul>
        {project.time_logs.map((timeLog) => (
          <li key={timeLog.id}>
            <p>Description: {timeLog.description}</p>
            <p>Entry Date: {timeLog.entry_date}</p>
            <p>Hours: {timeLog.hours}</p>
            <p>Status: {timeLog.status}</p>
            <button onClick={() => handleDeleteTimeLog(timeLog.id)}>Delete</button>
            <EditTimeLog projectId={project.id} timeLog={timeLog} onTimeLogUpdated={(updatedLog) => {
              setProject((prevProject) => ({
                ...prevProject,
                time_logs: prevProject.time_logs.map((log) => log.id === updatedLog.id ? updatedLog : log),
              }));
            }} />
          </li>
        ))}
      </ul>
      <NewTimeLog projectId={project.id} onTimeLogCreated={handleTimeLogCreated} />
    </div>
  );
};

export default ProjectDetails;
