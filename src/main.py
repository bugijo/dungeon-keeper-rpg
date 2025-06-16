from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # NOVO IMPORT
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from . import crud, models, schemas, auth
from .database import SessionLocal, engine, get_db
from .auth import get_current_user_from_token
from .routers import items, monsters, npcs, stories, tables, users, backup  # Adicionado users e backup

# Cria as tabelas no banco de dados (só na primeira vez que rodar)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dungeon Keeper API",
    description="O motor para o seu universo de RPG.",
    version="0.1.0"
)

# --- Middleware de CORS (ESSENCIAL) ---
# Isso permite que seu frontend (rodando em localhost:3000)
# converse com seu backend (que rodará em localhost:8000).
origins = [
    "http://localhost:3000",  # Endereço do seu app React
    "http://localhost:8000",  # Endereço alternativo
    # Adicione outros endereços se necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Monte um diretório estático para servir as imagens de avatar
app.mount("/avatars", StaticFiles(directory="static/avatars"), name="avatars")

# --- Incluir Roteadores ---
app.include_router(users.router)  # Inclua o novo roteador de usuários
app.include_router(backup.router)  # Inclua o novo roteador de backup
app.include_router(items.router)
app.include_router(monsters.router)
app.include_router(npcs.router)
app.include_router(stories.router)
app.include_router(tables.router)

# --- LISTAS EM MEMÓRIA REMOVIDAS - AGORA USANDO 100% BANCO DE DADOS ---

# --- Endpoints da API ---

# --- Endpoints de Autenticação Refatorados ---
@app.post("/api/v1/register", response_model=schemas.UserBase)
def register_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user_in.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    created_user = crud.create_user(db=db, user=user_in)
    return schemas.UserBase(username=created_user.username, email=created_user.email)

@app.post("/api/v1/token", response_model=schemas.Token)
async def login_for_access_token(form_data: schemas.TokenRequestForm, db: Session = Depends(get_db)):
    # Esta chamada deve usar a função centralizada do módulo auth
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username, "user_id": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- Endpoints de Personagem ---
@app.post("/api/v1/characters", response_model=schemas.Character)
def create_character_for_current_user(
    character_in: schemas.CharacterCreate,
    db: Session = Depends(get_db),
    current_user: schemas.TokenData = Depends(auth.get_current_user_from_token)
):
    return crud.create_character_for_user(db=db, character=character_in, owner_id=current_user.user_id)

@app.get("/api/v1/characters", response_model=List[schemas.Character])
def get_user_characters(
    db: Session = Depends(get_db),
    current_user: schemas.TokenData = Depends(auth.get_current_user_from_token)
):
    return crud.get_characters_by_owner(db=db, owner_id=current_user.user_id)

@app.get("/")
def read_root():
    return {"status": "Dungeon Keeper API está online!"}