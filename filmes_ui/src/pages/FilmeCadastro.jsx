import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import FilmeForm from '../components/FilmeForm';

const FilmeCadastro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEditing) {
      apiClient.get(`/filmes/${id}`)
        .then(response => setInitialData(response.data))
        .catch(error => console.error("Erro ao buscar dados:", error));
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData) => {
    const promise = isEditing
      ? apiClient.put(`/filmes/${id}`, formData)
      : apiClient.post('/filmes', formData);

    try {
      await promise;
      alert(`Filme ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigate('/filmes');
    } catch (error) {
      alert('Ocorreu um erro ao salvar o filme.');
    }
  };

  if (isEditing && !initialData) return <div>Carregando...</div>

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <FilmeForm onSubmit={handleSubmit} initialData={initialData} isEditing={isEditing} />
          </div>
        </div>
      </main>
    </>
  );
};

export default FilmeCadastro;