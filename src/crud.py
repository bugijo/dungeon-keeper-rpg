from sqlalchemy.orm import Session
from . import models, schemas
from .auth import get_password_hash
from typing import Optional
import uuid

# --- FUNÇÕES CRUD PARA USUÁRIOS ---
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        id=str(uuid.uuid4()),
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- FUNÇÕES CRUD PARA MESAS ---
def get_tables(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Table).offset(skip).limit(limit).all()

def create_table(db: Session, table: schemas.TableCreate, master_id: str):
    db_table = models.Table(
        id=str(uuid.uuid4()),
        title=table.title,
        description=table.description,
        master_id=master_id,
        story_id=table.story_id
    )
    db.add(db_table)
    db.commit()
    db.refresh(db_table)
    return db_table

# --- FUNÇÕES CRUD PARA PERSONAGENS ---
def get_characters_by_owner(db: Session, owner_id: str):
    return db.query(models.Character).filter(models.Character.owner_id == owner_id).all()

def get_user_characters(db: Session, user_id: str):
    return db.query(models.Character).filter(models.Character.owner_id == user_id).all()

def create_character_for_user(db: Session, character: schemas.CharacterCreate, user_id: str):
    db_character = models.Character(**character.model_dump(), owner_id=user_id, id=str(uuid.uuid4()))
    db.add(db_character)
    db.commit()
    db.refresh(db_character)
    return db_character

# --- FUNÇÕES CRUD PARA ITENS ---
def get_user_items(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Item).filter(models.Item.creator_id == user_id).offset(skip).limit(limit).all()

def create_user_item(db: Session, item: schemas.ItemCreate, user_id: str):
    db_item = models.Item(**item.model_dump(), creator_id=user_id, id=str(uuid.uuid4()))
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# --- FUNÇÕES CRUD PARA MONSTROS ---
def get_user_monsters(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Monster).filter(models.Monster.creator_id == user_id).offset(skip).limit(limit).all()

def create_user_monster(db: Session, monster: schemas.MonsterCreate, user_id: str):
    db_monster = models.Monster(**monster.model_dump(), creator_id=user_id, id=str(uuid.uuid4()))
    db.add(db_monster)
    db.commit()
    db.refresh(db_monster)
    return db_monster

# --- FUNÇÕES CRUD PARA NPCS ---
def get_user_npcs(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.NPC).filter(models.NPC.creator_id == user_id).offset(skip).limit(limit).all()

def create_user_npc(db: Session, npc: schemas.NPCCreate, user_id: str):
    db_npc = models.NPC(**npc.model_dump(), creator_id=user_id, id=str(uuid.uuid4()))
    db.add(db_npc)
    db.commit()
    db.refresh(db_npc)
    return db_npc

# --- FUNÇÕES CRUD PARA HISTÓRIAS ---
def get_user_stories(db: Session, user_id: str):
    return db.query(models.Story).filter(models.Story.creator_id == user_id).all()

def create_user_story(db: Session, story_data: schemas.StoryCreate, user_id: str):
    db_story = models.Story(
        id=str(uuid.uuid4()),
        title=story_data.title,
        synopsis=story_data.synopsis,
        creator_id=user_id
    )
    
    # Associa os itens, monstros e NPCs existentes
    db_story.items = db.query(models.Item).filter(models.Item.id.in_(story_data.item_ids)).all()
    db_story.monsters = db.query(models.Monster).filter(models.Monster.id.in_(story_data.monster_ids)).all()
    db_story.npcs = db.query(models.NPC).filter(models.NPC.id.in_(story_data.npc_ids)).all()
    
    db.add(db_story)
    db.commit()
    db.refresh(db_story)
    return db_story

# --- FUNÇÕES CRUD PARA SOLICITAÇÕES DE ENTRADA EM MESAS ---
def create_join_request(db: Session, table_id: str, user_id: str):
    # Verifica se já não existe um pedido pendente ou se o usuário já está na mesa
    existing_request = db.query(models.JoinRequest).filter(
        models.JoinRequest.table_id == table_id,
        models.JoinRequest.user_id == user_id,
        models.JoinRequest.status == "pending"
    ).first()
    
    if existing_request:
        return None  # Já existe uma solicitação pendente
    
    # Verifica se o usuário já é jogador da mesa
    table = db.query(models.Table).filter(models.Table.id == table_id).first()
    if table and any(player.id == user_id for player in table.players):
        return None  # Usuário já é jogador da mesa
    
    db_request = models.JoinRequest(
        id=str(uuid.uuid4()),
        table_id=table_id,
        user_id=user_id,
        status="pending"
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def manage_join_request(db: Session, request_id: str, new_status: str):
    db_request = db.query(models.JoinRequest).filter(models.JoinRequest.id == request_id).first()
    if not db_request:
        return None
    
    db_request.status = new_status
    
    if new_status == "approved":
        # Se aprovado, adiciona o usuário à lista de jogadores da mesa
        table = db.query(models.Table).filter(models.Table.id == db_request.table_id).first()
        user = db.query(models.User).filter(models.User.id == db_request.user_id).first()
        if table and user:
            table.players.append(user)
    
    db.commit()
    db.refresh(db_request)
    return db_request

def get_table_join_requests(db: Session, table_id: str):
    return db.query(models.JoinRequest).filter(
        models.JoinRequest.table_id == table_id,
        models.JoinRequest.status == "pending"
    ).all()

# NOVA FUNÇÃO para atualizar um usuário
def update_user(db: Session, user_id: str, user_update: schemas.UserUpdate | schemas.NotificationSettingsUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        # exclude_unset=True é a chave! Garante que só atualizemos os campos enviados.
        update_data = user_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user