import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const FilmeDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    apiClient.get(`/filmes/${id}`)
      .then(response => setFilme(response.data))
      .catch(error => console.error("Erro ao buscar filme:", error));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      try {
        await apiClient.delete(`/filmes/${id}`);
        alert('Filme excluído com sucesso!');
        navigate('/filmes');
      } catch (error) {
        alert('Erro ao excluir o filme.');
      }
    }
  };

  if (!filme) return <div>Carregando...</div>;

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img src={filme.url_poster} className="img-fluid rounded shadow" alt={filme.titulo} />
          </div>
          <div className="col-md-8">
            <h2>{filme.titulo} <span className="text-muted">({filme.ano_de_lancamento})</span></h2>
            <p className="lead">{filme.genero}</p>
            <p>{filme.sinopse}</p>
            <hr />
            <div className="d-flex gap-2">
              <Link to="/filmes" className="btn btn-secondary">Voltar para a Lista</Link>
              <Link to={`/filmes/editar/${id}`} className="btn btn-primary">Editar</Link>
              <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FilmeDetalhes;