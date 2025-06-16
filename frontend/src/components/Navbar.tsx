import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import heartIcon from '../assets/icons/heart.svg';

export function Navbar() {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Dados simulados para usuário logado
  const userData = { level: 25, gold: 1350, gems: 12, shards: 65 };

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b-2 border-secondary/50 shadow-lg p-4 flex justify-between items-center text-text-base">
      {/* Lado Esquerdo */}
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-14" /> {/* Logo como imagem */}
        <h1 className="text-2xl font-title font-bold text-primary">Dungeon Keeper</h1>
      </div>
      
      {/* Lado Direito */}
      <div className="flex items-center space-x-6">
        {token && user ? (
          <>
            <Link to="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/profile-avatar.png" alt="Avatar" className="h-14 w-14 rounded-full border-2 border-primary/50" />
              <div className="text-left">
                <span className="text-xl font-title font-bold text-text-base">{user.username}</span>
                <span className="block text-sm text-primary">Level {userData.level}</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4 bg-surface/50 px-4 py-2 rounded-lg border border-gray-700">
              <div className="flex items-center" title="Ouro"><img src="/icons/Ouro.svg" alt="Ouro" className="h-5 w-5 mr-2" /><span>{userData.gold}</span></div>
              <div className="flex items-center" title="Gemas"><img src="/icons/Gema.svg" alt="Gemas" className="h-5 w-5 mr-2" /><span>{userData.gems}</span></div>
              <div className="flex items-center" title="Fragmentos"><img src={heartIcon} alt="Fragmentos" className="h-5 w-5 mr-2" /><span>{userData.shards}</span></div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/profile" className="p-2 rounded-full bg-surface/60 hover:bg-surface" title="Configurações">
                <img src="/icons/Configuracao.svg" alt="Configurações" className="h-6 w-6" />
              </Link>
              <button onClick={handleLogout} className="p-2 rounded-full bg-surface/60 hover:bg-surface" title="Sair"><img src="/icons/Sair.svg" alt="Sair" className="h-6 w-6" /></button>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <Link to="/login" className="px-4 py-2 bg-primary hover:bg-primary/90 text-background font-medium rounded-lg transition-colors">
              Entrar
            </Link>
            <Link to="/register" className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-background font-medium rounded-lg transition-colors">
              Registrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}