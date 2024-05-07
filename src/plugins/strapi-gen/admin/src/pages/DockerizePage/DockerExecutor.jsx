import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';

function DockerExecutor() {
  const [imageName, setImageName] = useState('');
  const [imageTag, setImageTag] = useState('');
  const [containerPort, setContainerPort] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleDockerRun = async () => {
    try {
      const response = await axios.post('http://localhost:1337/strapi-gen/docker/deployImage', {
        imageName,
        imageTag,
        containerPort
      });
      setMessage(`Container started with ID: ${response.data}`);
      setOpen(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Run Docker Image
      </Typography>
      <Box component="form" sx={{ width: '100%', maxWidth: 500 }}>
        <TextField 
          label="Docker Image Name" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={imageName} 
          onChange={e => setImageName(e.target.value)} 
        />
        <TextField 
          label="Docker Image Tag" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={imageTag} 
          onChange={e => setImageTag(e.target.value)} 
        />
        <TextField 
          label="Container Port" 
          type="number" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={containerPort} 
          onChange={e => setContainerPort(e.target.value)} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleDockerRun} 
          fullWidth 
          size="large"
          sx={{ mt: 2 }}
        >
          RUN DOCKER IMAGE
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.includes('error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DockerExecutor;
