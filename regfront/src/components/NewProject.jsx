import { useState } from "react";
import axios from "axios";

const NewProject = ({ onProjectCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/projects", {
        project: { name, description, status, start_date: startDate, end_date: endDate },
      }, { withCredentials: true });
      onProjectCreated(response.data);
      setName("");
      setDescription("");
      setStatus("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      setError("Error creating project");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit">Create Project</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewProject;
