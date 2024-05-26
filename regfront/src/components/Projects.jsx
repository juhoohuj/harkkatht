import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
} from "@mui/material";
import NewProject from "./NewProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("all");

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

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const sortedProjects = projects.filter((project) => {
    const today = new Date().toISOString().split("T")[0];
    if (sortCriteria === "ended") {
      return project.end_date < today;
    }
    if (sortCriteria === "ongoing") {
      return project.start_date <= today && project.end_date >= today;
    }
    if (sortCriteria === "upcoming") {
      return project.start_date > today;
    }
    return true;
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Projects</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select labelId="sort-label" value={sortCriteria} onChange={handleSortChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="ended">Ended</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
        <List>
          {sortedProjects.map((project) => (
            <React.Fragment key={project.id}>
              <ListItem component={Link} to={`/projects/${project.id}`} button>
                <ListItemText
                  primary={project.name}
                  secondary={`Start Date: ${project.start_date} - End Date: ${project.end_date}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <NewProject onProjectCreated={handleProjectCreated} />
      </Paper>
    </Container>
  );
};

export default Projects;
