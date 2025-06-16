# Dungeon Keeper RPG - Frontend

Frontend React para o sistema de gerenciamento de RPG Dungeon Keeper.

## Tecnologias Utilizadas

- **React 19** com TypeScript
- **React Router DOM** para roteamento
- **Zustand** para gerenciamento de estado
- **Axios** para requisições HTTP
- **Tailwind CSS** para estilização
- **JWT Decode** para autenticação
- **React Icons** para ícones
- **Cypress** para testes E2E

## Funcionalidades

### Autenticação
- Login e registro de usuários
- Autenticação JWT com refresh automático
- Rotas protegidas

### Dashboard
- Visão geral do sistema
- Navegação para diferentes seções
- Interface temática medieval

### Gerenciamento de Personagens
- Criação de personagens D&D 5e
- Visualização de fichas de personagem
- Sistema de atributos e níveis

### Ferramentas de Criação
- Criação de itens personalizados
- Criação de monstros
- Criação de NPCs
- Criação de histórias

### Sistema de Mesas
- Criação e gerenciamento de mesas de RPG
- Sistema de solicitações para participar
- Aprovação/rejeição de jogadores

### Perfil do Usuário
- Edição de perfil
- Upload de avatar
- Configurações de notificação
- Sistema de backup e importação de dados

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── DashboardCard.tsx
│   ├── ProtectedRoute.tsx
│   └── ThemeManager.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   ├── TablesPage.tsx
│   ├── CharactersPage.tsx
│   └── CreationToolsPage.tsx
├── services/           # Serviços de API
│   └── api.ts
├── stores/             # Gerenciamento de estado
│   ├── authStore.ts
│   └── uiStore.ts
├── assets/             # Recursos estáticos
└── App.tsx             # Componente principal
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm test` - Executa testes unitários
- `npm run cypress:open` - Abre interface do Cypress
- `npm run test:e2e` - Executa testes E2E

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

3. Acesse http://localhost:3000

## Temas

O sistema suporta temas claro e escuro com paleta de cores medieval:

- **Tema Escuro**: Tons de cinza escuro com acentos dourados
- **Tema Claro**: Tons claros com acentos laranja e índigo

## Integração com Backend

O frontend se conecta com a API FastAPI rodando em `http://localhost:8000`.

Todas as requisições são automaticamente autenticadas via JWT tokens armazenados no localStorage.

## Funcionalidade de Backup

O sistema inclui funcionalidade completa de backup e restauração:

- **Exportação**: Download de todos os dados do usuário em formato JSON
- **Importação**: Upload e restauração de dados de backup
- **Validação**: Verificação de integridade dos dados importados

## Responsividade

A interface é totalmente responsiva, adaptando-se a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)