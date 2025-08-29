import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(credentials);
    } catch (err) {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-4 p-md-5">
          <h3 className="card-title text-center mb-4">Acessar Sistema</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label htmlFor="email" className="form-label">Email</label><input type="email" id="email" name="email" className="form-control" onChange={handleChange} required /></div>
            <div className="mb-3"><label htmlFor="password" className="form-label">Senha</label><input type="password" id="password" name="password" className="form-control" onChange={handleChange} required /></div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <div className="d-grid mt-4"><button className="btn btn-primary" type="submit">Entrar</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;