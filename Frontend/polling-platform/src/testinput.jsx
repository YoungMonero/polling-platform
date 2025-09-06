import { useState } from 'react';
import api from '../src/services/api.js';
import { setToken } from '../src/utils/auth.js';
import { useNavigate } from 'react-router-dom';

const HostLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      setToken(data.token);
      console.log('Logged in, token:', data.token);
      navigate('/create-poll');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container">
      <h2>Host Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default HostLogin;