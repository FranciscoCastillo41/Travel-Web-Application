import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/styles/loginRegister.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Dispatch the registerUser action with email, password, displayName, and navigate function
    dispatch(registerUser(email, password, displayName, navigate));
  };

  return (
    <div className="container mt-5">
      <div className="card p-3 mx-auto" style={{ maxWidth: '400px', marginTop: '7rem' }}>
        <h2 className="mb-4">Register</h2>
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
          <div className="mb-3">
            <label htmlFor="displayName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary button-accent" onClick={handleRegister}>
            Register
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;



