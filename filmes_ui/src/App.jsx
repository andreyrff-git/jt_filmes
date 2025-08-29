import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Login from './pages/Login';
import FilmesLista from './pages/FilmesLista';
import FilmeDetalhes from './pages/FilmeDetalhes';
import FilmeCadastro from './pages/FilmeCadastro';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rota Pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/filmes" element={<FilmesLista />} />
            <Route path="/filmes/novo" element={<FilmeCadastro />} />
            <Route path="/filmes/editar/:id" element={<FilmeCadastro />} />
            <Route path="/filmes/:id" element={<FilmeDetalhes />} />
          </Route>

          {/* Redirecionamento Padrão */}
          <Route path="/" element={<Navigate to="/filmes" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;