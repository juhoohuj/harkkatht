import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Alert, Container, Paper, Grid, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NewTimeLog from './NewTimeLog';
import EditTimeLog from './EditTimeLog';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [userError, setUserError] = useState(null);
  const [userSuccess, setUserSuccess] = useState(null);
  const [editingLogId, setEditingLogId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredTimeLogs = project
    ? project.time_logs.filter(
        (log) =>
          log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!project) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#fff' }}>
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>{project.name}</Typography>
          <Button variant="contained" color="primary" size='small' onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </Grid>
        <Typography variant="body1" gutterBottom>{project.description}</Typography>
        <Typography variant="body2" gutterBottom>Status: {project.status}</Typography>

        <Typography variant="h6" gutterBottom>Time Logs</Typography>
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <TextField
            placeholder="Search by description or status"
            size='small'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <List>
          {filteredTimeLogs.map((timeLog) => (
            <React.Fragment key={timeLog.id}>
              <ListItem>
                <ListItemText
                  primary={`Description: ${timeLog.description}`}
                  secondary={
                    <>
                      <Typography component="span">Entry Date: {timeLog.entry_date}</Typography> <br />
                      <Typography component="span">Hours: {timeLog.hours}</Typography> <br />
                      <Typography component="span">Status: {timeLog.status}</Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => setEditingLogId(editingLogId === timeLog.id ? null : timeLog.id)}>
                    {editingLogId === timeLog.id ? <CloseIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTimeLog(timeLog.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {editingLogId === timeLog.id && (
                <EditTimeLog
                  projectId={project.id}
                  timeLog={timeLog}
                  onTimeLogUpdated={(updatedLog) => {
                    setProject((prevProject) => ({
                      ...prevProject,
                      time_logs: prevProject.time_logs.map((log) => log.id === updatedLog.id ? updatedLog : log),
                    }));
                    setEditingLogId(null);
                  }}
                />
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <NewTimeLog projectId={project.id} onTimeLogCreated={handleTimeLogCreated} />

        <Typography variant="h6" gutterBottom>Users</Typography>
        <List>
          {project.users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.email} />
            </ListItem>
          ))}
        </List>
        
        <Box component="form" onSubmit={handleAddUser} style={{ marginBottom: '20px' }}>
          <TextField
            type="email"
            label="User email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            size='small'
          />
          <Button type="submit" variant="contained" color="primary" size='small' fullWidth>Add User</Button>
        </Box>
        
        {userError && <Alert severity="error">{userError}</Alert>}
        {userSuccess && <Alert severity="success">{userSuccess}</Alert>}
        <Grid container justifyContent="center" >
        <Button variant="contained" color="error" onClick={handleDeleteProject} size='small' style={{ marginTop: '20px', }}>Delete Project</Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProjectDetails;
