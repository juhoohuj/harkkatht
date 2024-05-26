import { useState } from "react";
import axios from "axios";

const NewTimeLog = ({ projectId, onTimeLogCreated }) => {
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [hours, setHours] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/projects/${projectId}/time_logs`, {
        time_log: { description, entry_date: entryDate, hours, status },
      }, { withCredentials: true });
      onTimeLogCreated(response.data);
      setDescription("");
      setEntryDate("");
      setHours("");
      setStatus("");
    } catch (err) {
      setError("Error creating time log");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Time Log</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Entry Date</label>
          <input 
            type="date" 
            value={entryDate} 
            onChange={(e) => setEntryDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Hours</label>
          <input 
            type="number" 
            placeholder="Hours" 
            value={hours} 
            onChange={(e) => setHours(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Status</label>
          <input 
            type="text" 
            placeholder="Status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
          />
        </div>
        <button type="submit">Add Time Log</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewTimeLog;
