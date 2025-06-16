import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuthStore } from '../stores/authStore';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Agora criamos um objeto simples, não FormData
      const credentials = { username, password };
      const data = await loginUser(credentials);
      login(data.access_token);
      navigate('/'); // Redireciona para o Dashboard
    } catch (err: any) {
      // Define uma mensagem de erro genérica e segura para o usuário
      setError("Nome de usuário ou senha inválidos. Por favor, tente novamente.");
      console.error("Erro detalhado do login:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-surface/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-secondary/30">
        <div className="text-center mb-8">
          <h1 className="font-title text-4xl text-primary mb-2">DK</h1>
          <h2 className="font-title text-2xl text-text mb-2">Entrar</h2>
          <p className="text-text-muted text-sm">Acesse sua conta de RPG</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text text-sm font-medium mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite seu nome de usuário"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-secondary/50 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-background font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}