import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";

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
    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px', marginBottom: '20px' }}>
      <Typography variant="h6">Add Time Log</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
          size="small"
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
          size="small"
        />
        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <Button type="submit" variant="contained" color="primary" size="small">Add Time Log</Button>
        {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default NewTimeLog;
