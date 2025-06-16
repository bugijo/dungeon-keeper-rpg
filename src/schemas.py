from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
import uuid

# --- Schemas de Personagem ---
class CharacterBase(BaseModel):
    name: str
    race: str
    character_class: str
    level: int = 1

class CharacterCreate(CharacterBase):
    pass

class Character(CharacterBase):
    id: str
    owner_id: str
    
    class Config:
        from_attributes = True

# --- Schemas de Mesa ---
class TableBase(BaseModel):
    title: str
    description: Optional[str] = None
    
class TableCreate(TableBase):
    story_id: str

class Table(TableBase):
    id: str
    master_id: str
    story_id: str
    story: 'Story'
    players: List['UserBase'] = []
    join_requests: List['JoinRequest'] = []
    
    class Config:
        from_attributes = True

# --- Schemas de Item ---
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: str = "Mundane"
    rarity: str = "Common"

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: str
    creator_id: str
    
    class Config:
        from_attributes = True

# --- Schemas de Monster ---
class MonsterBase(BaseModel):
    name: str
    size: str
    type: str
    armor_class: int
    hit_points: str
    speed: str
    actions: Optional[str] = None
    challenge_rating: str

class MonsterCreate(MonsterBase):
    pass

class Monster(MonsterBase):
    id: str
    creator_id: str
    
    class Config:
        from_attributes = True

# --- Schemas de NPC ---
class NPCBase(BaseModel):
    name: str
    description: Optional[str] = None
    role: Optional[str] = "Cidadão"
    location: Optional[str] = None
    notes: Optional[str] = None

class NPCCreate(NPCBase):
    pass

class NPC(NPCBase):
    id: str
    creator_id: str
    
    class Config:
        from_attributes = True

# --- Schemas de Story ---
class StoryBase(BaseModel):
    title: str
    synopsis: Optional[str] = None

class StoryCreate(StoryBase):
    item_ids: List[str] = []
    monster_ids: List[str] = []
    npc_ids: List[str] = []

class Story(StoryBase):
    id: str
    creator_id: str
    items: List[Item] = []
    monsters: List[Monster] = []
    npcs: List[NPC] = []
    
    class Config:
        from_attributes = True

# --- Modelos de Usuário ---
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

# NOVO Schema para atualização de perfil
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    bio: Optional[str] = None

# NOVO Schema para atualização de notificações
class NotificationSettingsUpdate(BaseModel):
    notify_on_join_request: Optional[bool] = None
    notify_on_request_approved: Optional[bool] = None
    notify_on_new_story: Optional[bool] = None

class UserInDB(UserBase):
    id: str
    hashed_password: str
    is_active: bool
    
    class Config:
        from_attributes = True

# --- Schema para exibir uma solicitação ---
class JoinRequest(BaseModel):
    id: str
    user_id: str
    status: str
    user: UserBase  # Mostra os dados básicos de quem pediu para entrar
    
    class Config:
        from_attributes = True

# --- Atualize o User Schema para incluir as relações ---
class User(UserBase):
    id: str
    is_active: bool
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    notify_on_join_request: bool
    notify_on_request_approved: bool
    notify_on_new_story: bool
    tables: List[Table] = []
    characters: List[Character] = []
    items: List[Item] = []
    monsters: List[Monster] = []
    npcs: List[NPC] = []
    stories: List[Story] = []
    joined_tables: List[Table] = []  # Mesas que o usuário entrou como jogador
    
    class Config:
        from_attributes = True

# --- Modelos de Token ---
class TokenRequestForm(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[str] = None

# --- Schema para Backup Completo do Usuário ---
class UserBackup(BaseModel):
    characters: List[Character]
    items: List[Item]
    monsters: List[Monster]
    npcs: List[NPC]
    stories: List[Story]