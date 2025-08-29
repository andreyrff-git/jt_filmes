import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const FilmesLista = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/filmes')
      .then(response => setFilmes(response.data.data))
      .catch(error => console.error("Erro ao buscar filmes:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Catálogo de Filmes</h1>
          <Link to="/filmes/novo" className="btn btn-primary">+ Adicionar Filme</Link>
        </div>
        <div className="row">
          {filmes.map(filme => (
            <div key={filme.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img src={filme.url_poster} className="card-img-top" alt={filme.titulo} style={{ height: '320px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{filme.titulo}</h5>
                  <p className="card-text text-muted mb-1">{filme.genero} - {filme.ano_de_lancamento}</p>
                  <Link to={`/filmes/${filme.id}`} className="btn btn-sm btn-outline-secondary w-100">Ver Detalhes</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default FilmesLista;