import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/filmes">Filmes Online</NavLink>
        <div className="d-flex align-items-center">
          {user && <span className="navbar-text me-3">Olá, {user.name}</span>}
          <button onClick={logout} className="btn btn-danger">Sair</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;