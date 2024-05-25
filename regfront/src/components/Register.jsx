import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', { 
        user: { 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        }
      }, { withCredentials: true });
      if (response.data.notice) {
        navigateTo('/projects');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join(', '));
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
