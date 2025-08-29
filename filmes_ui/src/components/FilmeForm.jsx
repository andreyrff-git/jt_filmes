import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FilmeForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    titulo: '', ano_lancamento: '', genero: '', sinopse: '', url_poster: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData(initialData);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-center mb-8">{isEditing ? 'Editar Filme' : 'Adicionar Filme'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label htmlFor="titulo" className="form-label">Título</label><input type="text" className="form-control" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required /></div>
          <div className="mb-3"><label htmlFor="ano_lancamento" className="form-label">Ano</label><input type="number" className="form-control" id="ano_lancamento" name="ano_lancamento" value={formData.ano_lancamento} onChange={handleChange} required /></div>
          <div className="mb-3"><label htmlFor="genero" className="form-label">Gênero</label><input type="text" className="form-control" id="genero" name="genero" value={formData.genero} onChange={handleChange} required /></div>
          <div className="mb-3"><label htmlFor="url_poster" className="form-label">URL do Pôster</label><input type="url" className="form-control" id="url_poster" name="url_poster" value={formData.url_poster} onChange={handleChange} required /></div>
          <div className="mb-3"><label htmlFor="sinopse" className="form-label">Sinopse</label><textarea className="form-control" id="sinopse" name="sinopse" rows="4" value={formData.sinopse} onChange={handleChange} required></textarea></div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/filmes')}>Cancelar</button>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Salvar' : 'Cadastrar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilmeForm;