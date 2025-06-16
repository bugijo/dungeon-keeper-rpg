# Dungeon Keeper RPG

Uma plataforma web completa para criação e gerenciamento de campanhas de RPG, onde mestres podem criar histórias e organizar mesas de jogo com jogadores.

## 🚀 Funcionalidades Principais

### 👤 Sistema de Usuários
- Autenticação JWT segura
- Perfis de usuário personalizáveis
- Controle de acesso baseado em roles
- Sistema de backup e importação de dados
- Upload de avatar personalizado

### 📚 Sistema de Histórias
- Criação e edição de campanhas
- Sistema de sinopses e descrições
- Vinculação de histórias a mesas de jogo
- Gerenciamento de conteúdo por usuário

### 🎯 Sistema de Mesas
- Criação de mesas baseadas em histórias
- Sistema de solicitações de entrada
- Aprovação/recusa de jogadores pelo mestre
- Configuração de número máximo de jogadores
- Suporte a mesas online e presenciais

### 🎮 Gerenciamento de Jogadores
- Sistema de solicitações para participar de mesas
- Controle de vagas por mesa
- Interface intuitiva para mestres gerenciarem jogadores

### 🎲 Ferramentas de Criação
- Sistema completo de criação de personagens D&D 5e
- Criação de itens personalizados
- Criação de monstros e NPCs
- Gerador de histórias e campanhas

## 🏗️ Arquitetura do Projeto

```
Dungeon Keeper/
├── backend/                 # API FastAPI
│   ├── src/
│   │   ├── models.py       # Modelos SQLAlchemy
│   │   ├── schemas.py      # Schemas Pydantic
│   │   ├── crud.py         # Operações CRUD
│   │   ├── auth.py         # Autenticação JWT
│   │   ├── main.py         # Aplicação principal
│   │   └── routers/        # Endpoints da API
│   │       ├── auth.py
│   │       ├── stories.py
│   │       ├── tables.py
│   │       ├── users.py
│   │       ├── characters.py
│   │       ├── items.py
│   │       ├── monsters.py
│   │       ├── npcs.py
│   │       └── backup.py
│   ├── alembic/            # Migrações do banco
│   └── requirements.txt
├── frontend/               # Interface React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Chamadas para API
│   │   ├── stores/         # Gerenciamento de estado (Zustand)
│   │   └── utils/          # Utilitários
│   ├── package.json
│   └── tailwind.config.js  # Configuração do Tailwind CSS
└── dungeon_keeper.db       # Banco SQLite
```

## 📋 Pré-requisitos

### Backend
- Python 3.8+
- pip (gerenciador de pacotes Python)
- SQLite (incluído no Python)

### Frontend
- Node.js 16+
- npm ou yarn

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/bugijo/dungeon-keeper-rpg.git
cd dungeon-keeper-rpg
```

### 2. Configuração do Backend
```bash
# Entre no diretório do backend
cd backend

# Instale as dependências
pip install -r requirements.txt

# Configure o banco de dados
python -m alembic upgrade head

# Inicie o servidor backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Configuração do Frontend
```bash
# Em um novo terminal, entre no diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### 4. Acesso à Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs

## 🐳 Docker (Opcional)

Para executar com Docker:

```bash
# Construir e executar com docker-compose
docker-compose up --build
```

## 🧪 Testes

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

### Testes E2E
```bash
cd frontend
npm run cypress:open
```

## 📚 Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework web moderno e rápido
- **SQLAlchemy**: ORM para Python
- **Alembic**: Migrações de banco de dados
- **Pydantic**: Validação de dados
- **JWT**: Autenticação segura
- **SQLite**: Banco de dados
- **Uvicorn**: Servidor ASGI

### Frontend
- **React 19**: Biblioteca para interfaces de usuário
- **TypeScript**: Superset tipado do JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **React Router**: Roteamento para React
- **Zustand**: Gerenciamento de estado
- **Axios**: Cliente HTTP
- **React Icons**: Biblioteca de ícones
- **Cypress**: Testes end-to-end

## 🎨 Design e UX

- **Tema Medieval**: Interface inspirada em RPGs clássicos
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Modo Escuro/Claro**: Suporte a temas personalizáveis
- **Fontes Temáticas**: Cinzel e Cormorant Garamond
- **Paleta de Cores**: Tons dourados e terrosos

## 🔧 Funcionalidades Avançadas

### Sistema de Backup
- Exportação completa de dados do usuário
- Importação de dados de backup
- Validação de integridade dos dados

### Autenticação Robusta
- Tokens JWT com refresh automático
- Proteção de rotas sensíveis
- Logout seguro

### Interface Intuitiva
- Dashboard centralizado
- Navegação clara e organizada
- Feedback visual para ações do usuário

## 📖 Documentação da API

A documentação completa da API está disponível em:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Principais Endpoints

#### Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token

#### Usuários
- `GET /users/me` - Dados do usuário atual
- `PUT /users/me` - Atualizar perfil
- `POST /users/avatar` - Upload de avatar

#### Mesas
- `GET /tables` - Listar mesas
- `POST /tables` - Criar mesa
- `POST /tables/{id}/join` - Solicitar entrada

#### Personagens
- `GET /characters` - Listar personagens
- `POST /characters` - Criar personagem
- `GET /characters/{id}` - Detalhes do personagem

#### Backup
- `GET /backup/export` - Exportar dados
- `POST /backup/import` - Importar dados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Bugijo** - *Desenvolvimento inicial* - [GitHub](https://github.com/bugijo)

## 🙏 Agradecimentos

- Comunidade D&D pela inspiração
- Contribuidores do projeto
- Bibliotecas e frameworks utilizados

---

**Dungeon Keeper RPG** - Transformando ideias em aventuras épicas! 🐉⚔️