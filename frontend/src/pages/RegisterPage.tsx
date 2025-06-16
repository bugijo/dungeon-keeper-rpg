import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, UserCreateData } from '../services/api';

export function RegisterPage() {
  const [formData, setFormData] = useState<UserCreateData>({
    username: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validações básicas
    if (formData.password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      setSuccess('Conta criada com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ocorreu um erro ao criar a conta.');
      console.error('Erro no registro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-surface/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-secondary/30">
        <div className="text-center mb-8">
          <h1 className="font-title text-4xl text-primary mb-2">DK</h1>
          <h2 className="font-title text-2xl text-text mb-2">Criar Conta</h2>
          <p className="text-text-muted text-sm">Junte-se à aventura</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Escolha um nome de usuário"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-text text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-text text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Crie uma senha segura"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-text text-sm font-medium mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirme sua senha"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative">
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-background font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}