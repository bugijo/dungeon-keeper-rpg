import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardCard } from '../components/DashboardCard';

const cardData = [
  { link: "/tables", icon: <img src="/icons/Mesas.svg" alt="Mesas" className="h-16 w-16" />, title: 'MESAS', description: 'Gerencie e participe de mesas de RPG.', buttonText: 'VER MESAS' },
  { link: "/characters", icon: <img src="/icons/Personagens.svg" alt="Personagens" className="h-16 w-16" />, title: 'PERSONAGENS', description: 'Crie e gerencie seus heróis de D&D.', buttonText: 'VER PERSONAGENS' },
  { link: "/missions", icon: <img src="/icons/Missoes.svg" alt="Missões" className="h-16 w-16" />, title: 'MISSÕES', description: 'Complete tarefas e ganhe recompensas.', buttonText: 'VER MISSÕES' },
  { link: "/inventory", icon: <img src="/icons/Inventario.svg" alt="Inventário" className="h-16 w-16" />, title: 'INVENTÁRIO', description: 'Veja e gerencie todos os seus itens.', buttonText: 'VER INVENTÁRIO' },
  { link: "/tools", icon: <img src="/icons/Criacoes.svg" alt="Criações" className="h-16 w-16" />, title: 'CRIAÇÕES', description: 'Use as ferramentas para criar seus elementos.', buttonText: 'CRIAR' },
  { link: "/store", icon: <img src="/icons/Loja.svg" alt="Loja" className="h-16 w-16" />, title: 'LOJA', description: 'Adquira itens e recursos para o inventário.', buttonText: 'IR PARA A LOJA' },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="relative text-center mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent blur-3xl"></div>
        <h1 className="relative font-title text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent mb-4 tracking-wider drop-shadow-2xl">
          BEM-VINDO AO
        </h1>
        <h2 className="relative font-title text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent tracking-widest drop-shadow-xl">
          REINO DAS AVENTURAS
        </h2>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {cardData.map((card) => (
          <Link to={card.link} key={card.title}>
            <DashboardCard 
              Icon={card.icon}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}