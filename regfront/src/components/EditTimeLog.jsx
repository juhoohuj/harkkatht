import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";

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
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Edit Time Log</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Entry Date"
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Update Time Log</Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default EditTimeLog;
