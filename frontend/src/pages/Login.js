import React, { useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0', // Change this to your desired background color
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here.
    // For this example, we'll simply display the entered username and password.
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5">Login</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;