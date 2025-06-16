# Dungeon Keeper RPG

Sistema completo de RPG D&D 5e com interface web moderna, gerenciamento de personagens, mesas, combate e backup de dados.

## Funcionalidades

- **Autenticação**: Sistema completo de login/registro com JWT
- **Personagens**: Criação e gerenciamento de personagens D&D 5e
- **Mesas**: Sistema de mesas com convites e gerenciamento
- **Combate**: Sistema de iniciativa e combate
- **Backup**: Exportação e importação de dados do usuário
- **Interface Moderna**: UI responsiva com temas claro/escuro

## Tecnologias

### Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- Alembic (migrações)
- Uvicorn

### Frontend
- React
- TypeScript
- Zustand (gerenciamento de estado)
- Axios
- CSS Modules

## Instalação

### Pré-requisitos
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend
```bash
# Instalar dependências
pip install -r requirements.txt

# Configurar banco de dados
alembic upgrade head

# Iniciar servidor
uvicorn src.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Uso

1. Acesse http://localhost:3000
2. Registre uma conta ou faça login
3. Crie personagens e mesas
4. Convide outros jogadores
5. Use as funcionalidades de backup para salvar seus dados

## Estrutura do Projeto

```
├── src/                 # Backend FastAPI
│   ├── routers/        # Endpoints da API
│   ├── models/         # Modelos SQLAlchemy
│   ├── schemas/        # Schemas Pydantic
│   └── systems/        # Sistemas de jogo
├── frontend/           # Frontend React
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── pages/      # Páginas
│   │   ├── services/   # Serviços API
│   │   └── stores/     # Stores Zustand
├── docs/               # Documentação
└── tests/              # Testes
```

## Contribuição

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## Licença

Este projeto está licenciado sob a MIT License - veja [LICENSE](LICENSE) para detalhes.