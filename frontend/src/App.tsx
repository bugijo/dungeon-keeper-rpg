import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeManager } from './components/ThemeManager';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { TablesPage } from './pages/TablesPage';
import { CharactersPage } from './pages/CharactersPage';
import { CreateCharacterPage } from './pages/CreateCharacterPage';
import { CharacterSheetPage } from './pages/CharacterSheetPage';
import { CreationToolsPage } from './pages/CreationToolsPage';
import { CreateItemPage } from './pages/CreateItemPage';
import { ItemsPage } from './pages/ItemsPage';
import { MonstersPage } from './pages/MonstersPage';
import { NpcsPage } from './pages/NpcsPage';
import { StoriesPage } from './pages/StoriesPage';
import { CreateStoryPage } from './pages/CreateStoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ThemeManager />
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/new" element={<CreateCharacterPage />} />
          <Route path="/characters/:id" element={<CharacterSheetPage />} />
          <Route path="/tools" element={<CreationToolsPage />} />
          <Route path="/tools/items" element={<ItemsPage />} />
          <Route path="/tools/items/new" element={<CreateItemPage />} />
          <Route path="/tools/monsters" element={<MonstersPage />} />
          <Route path="/tools/npcs" element={<NpcsPage />} />
          <Route path="/tools/stories" element={<StoriesPage />} />
          <Route path="/tools/stories/new" element={<CreateStoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;