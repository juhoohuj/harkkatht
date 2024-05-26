import { useState } from "react";
import axios from "axios";

const EditTimeLog = ({ projectId, timeLog, onTimeLogUpdated }) => {
  const [description, setDescription] = useState(timeLog.description);
  const [entryDate, setEntryDate] = useState(timeLog.entry_date);
  const [hours, setHours] = useState(timeLog.hours);
  const [status, setStatus] = useState(timeLog.status);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/projects/${projectId}/time_logs/${timeLog.id}`, {
        time_log: { description, entry_date: entryDate, hours, status },
      }, { withCredentials: true });
      onTimeLogUpdated(response.data);
    } catch (err) {
      setError("Error updating time log");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
        <input type="number" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} required />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <button type="submit">Update Time Log</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditTimeLog;
