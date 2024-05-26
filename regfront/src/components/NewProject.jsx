import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";

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
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Create New Project</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">Add Project</Button>
        {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default NewProject;
