from sqlalchemy import Table, Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

# --- TABELAS DE ASSOCIAÇÃO (Muitos-para-Muitos) ---
story_item_association = Table('story_item_association', Base.metadata,
    Column('story_id', String, ForeignKey('stories.id'), primary_key=True),
    Column('item_id', String, ForeignKey('items.id'), primary_key=True)
)

story_monster_association = Table('story_monster_association', Base.metadata,
    Column('story_id', String, ForeignKey('stories.id'), primary_key=True),
    Column('monster_id', String, ForeignKey('monsters.id'), primary_key=True)
)

story_npc_association = Table('story_npc_association', Base.metadata,
    Column('story_id', String, ForeignKey('stories.id'), primary_key=True),
    Column('npc_id', String, ForeignKey('npcs.id'), primary_key=True)
)

# Tabela de associação para registrar jogadores APROVADOS em uma mesa
table_players_association = Table('table_players_association', Base.metadata,
    Column('table_id', String, ForeignKey('tables.id'), primary_key=True),
    Column('user_id', String, ForeignKey('users.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    bio = Column(String, nullable=True)  # NOVO CAMPO
    avatar_url = Column(String, nullable=True)  # NOVO CAMPO
    notify_on_join_request = Column(Boolean, default=True)  # Mestre recebe e-mail quando alguém pede pra entrar
    notify_on_request_approved = Column(Boolean, default=True)  # Jogador recebe e-mail quando seu pedido é aprovado
    notify_on_new_story = Column(Boolean, default=True)  # Jogador recebe e-mail sobre novas histórias (marketing futuro)
    
    # Relacionamentos
    characters = relationship("Character", back_populates="owner")
    tables = relationship("Table", back_populates="master")
    items = relationship("Item", back_populates="creator")
    monsters = relationship("Monster", back_populates="creator")
    npcs = relationship("NPC", back_populates="creator")
    stories = relationship("Story", back_populates="creator")
    # Relação com as mesas em que o usuário é um jogador aprovado
    joined_tables = relationship("Table", secondary=table_players_association, back_populates="players")

# --- NOVO MODELO TABLE ---
class Table(Base):
    __tablename__ = "tables"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    master_id = Column(String, ForeignKey("users.id"))
    story_id = Column(String, ForeignKey("stories.id"))
    
    # Relacionamentos
    master = relationship("User", back_populates="tables")
    story = relationship("Story")
    # Jogadores aprovados na mesa
    players = relationship("User", secondary=table_players_association, back_populates="joined_tables")
    # Solicitações pendentes para a mesa
    join_requests = relationship("JoinRequest")

# --- NOVO MODELO CHARACTER ---
class Character(Base):
    __tablename__ = "characters"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    race = Column(String)
    character_class = Column(String)
    level = Column(Integer, default=1)
    owner_id = Column(String, ForeignKey("users.id"))
    
    # Relacionamento
    owner = relationship("User", back_populates="characters")

# --- NOVO MODELO ITEM ---
class Item(Base):
    __tablename__ = "items"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    type = Column(String, default="Mundane")  # Ex: 'Weapon', 'Armor', 'Potion', 'Mundane'
    rarity = Column(String, default="Common")  # Ex: 'Common', 'Uncommon', 'Rare'
    creator_id = Column(String, ForeignKey("users.id"))
    
    # Relacionamento
    creator = relationship("User", back_populates="items")
    stories = relationship("Story", secondary=story_item_association, back_populates="items")

# --- NOVO MODELO MONSTER ---
class Monster(Base):
    __tablename__ = "monsters"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    size = Column(String)  # Ex: Medium, Large
    type = Column(String)  # Ex: Beast, Undead, Aberration
    armor_class = Column(Integer)
    hit_points = Column(String)  # Ex: "22 (4d8 + 4)"
    speed = Column(String)  # Ex: "30 ft."
    actions = Column(Text)  # Para descrições longas de ataques/habilidades
    challenge_rating = Column(String)  # Ex: "1/2" ou "5"
    creator_id = Column(String, ForeignKey("users.id"))
    
    # Relacionamento
    creator = relationship("User", back_populates="monsters")
    stories = relationship("Story", secondary=story_monster_association, back_populates="monsters")

# --- NOVO MODELO NPC ---
class NPC(Base):
    __tablename__ = "npcs"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)  # Descrição física, personalidade
    role = Column(String)  # Ex: Lojista, Guarda, Nobre, Vilão
    location = Column(String)  # Ex: "Taverna do Pônei Saltitante"
    notes = Column(Text)  # Notas secretas para o mestre
    creator_id = Column(String, ForeignKey("users.id"))
    
    # Relacionamento
    creator = relationship("User", back_populates="npcs")
    stories = relationship("Story", secondary=story_npc_association, back_populates="stories")

# --- NOVO MODELO STORY ---
class Story(Base):
    __tablename__ = "stories"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    synopsis = Column(Text)
    creator_id = Column(String, ForeignKey("users.id"))
    
    # Relacionamentos
    creator = relationship("User", back_populates="stories")
    items = relationship("Item", secondary=story_item_association, back_populates="stories")
    monsters = relationship("Monster", secondary=story_monster_association, back_populates="stories")
    npcs = relationship("NPC", secondary=story_npc_association, back_populates="stories")

# --- NOVO MODELO JOIN REQUEST ---
# Tabela para registrar solicitações PENDENTES
class JoinRequest(Base):
    __tablename__ = "join_requests"
    
    id = Column(String, primary_key=True, index=True)
    table_id = Column(String, ForeignKey("tables.id"))
    user_id = Column(String, ForeignKey("users.id"))
    status = Column(String, default="pending")  # pending, approved, declined
    
    # Relacionamento
    user = relationship("User")