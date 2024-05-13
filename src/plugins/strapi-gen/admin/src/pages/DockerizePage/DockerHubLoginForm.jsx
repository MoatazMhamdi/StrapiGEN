import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css'; 
import strapigenImage from './images.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:1337/strapi-gen/docker/login', { username, password });
      localStorage.setItem('token', response.data.token);  
      history.push('/plugins/strapi-gen/DockerRepo');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <div style={{margin: '10px' }}> 
        <img src={strapigenImage}  alt="StrapiGEN" className="strapigen-image" style={{ width: '100%', maxWidth: '600px', marginBottom: '-60px' }} />
        </div>
        <div style={{margin: '30px' }}>

        <h2>Welcome Back</h2>
        <p>Sign in with your Docker Account</p>
        </div>

        <div className="input-container">
          <div style={{ margin: '12px' }}>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Write your username.." 
              className="project-name-input"
            />
          </div>
          <div style={{ margin: '12px' }}>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Write your password.." 
              className="project-name-input"
            />
          </div>
          <button onClick={handleLogin} className="btn btn-success" style={{ margin: '20px',padding:'10px' }}>Sign In</button>
          <div className="login-links"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
