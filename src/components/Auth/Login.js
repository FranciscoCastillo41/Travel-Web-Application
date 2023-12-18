import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { loginUser } from '../../redux/actions/authActions'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../assets/styles/loginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Dispatch the loginUser action with email, password, and navigate function
    dispatch(loginUser(email, password, navigate));
  };

  return (
    <div className="container mt-5">
      <div className="card p-3 mx-auto" style={{ maxWidth: '400px', marginTop: '7rem' }}>
        <h2 className="mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary button-accent" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Create a new one</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;


