import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

jest.mock('../api/axiosConfig');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Página de Login', () => {
  it('Chama função de login com dados válidos', async () => {
    // Simula uma resposta de sucesso da API
    apiClient.post.mockResolvedValue({ 
        data: { 
            access_token: 'fake-token',
            user: { name: 'Usuário Teste' }
        }
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    // Encontra os campos e o botão na tela
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Simula digitação e o clique
    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    // Espera até que a chamada à API (simulada) tenha sido feita
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/login', {
        email: 'teste@email.com',
        password: '123456',
      });
    });
  });
});