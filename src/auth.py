from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import os

from . import crud, schemas, database  # Importar crud, schemas e database

# --- CONFIGURAÇÃO DE SEGURANÇA DO TOKEN ---
SECRET_KEY = os.urandom(32).hex()
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- Contexto de Senha ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- OAuth2 ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

# --- Modelo para dados do token movido para schemas.py ---

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# --- FUNÇÃO DE AUTENTICAÇÃO CORRIGIDA E CENTRALIZADA ---
def authenticate_user(db: Session, username: str, password: str) -> Optional[schemas.UserInDB]:
    """
    Busca o usuário no banco de dados e verifica a senha.
    Retorna o objeto do usuário se for válido, senão None.
    """
    user = crud.get_user_by_username(db, username=username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

# --- FUNÇÕES JWT ---
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user_from_token(token: str = Depends(oauth2_scheme)) -> schemas.TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: str = payload.get("user_id")
        if username is None or user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username, user_id=user_id)
    except JWTError:
        raise credentials_exception
    return token_data

def get_current_active_user(
    token_data: schemas.TokenData = Depends(get_current_user_from_token),
    db: Session = Depends(database.get_db)
):
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None or not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user