import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Backend FastAPI rodando na porta 8000
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Intercepta TODAS as requisições antes de serem enviadas
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tipagem base para usuário
export type UserBase = {
  id: string;
  username: string;
  email: string;
};

// Tipagens para perfil do usuário
export type UserProfileData = {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
  // ... outras informações de perfil que possam vir no futuro
};

export type UserUpdateData = {
  email?: string;
  bio?: string;
};

// Tipagem para configurações de notificação
export type NotificationSettingsData = {
  notify_on_join_request?: boolean;
  notify_on_request_approved?: boolean;
  notify_on_new_story?: boolean;
};

// Tipagem para solicitação de entrada
export type JoinRequestData = {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'declined';
  user: UserBase;
};

// Adicione a tipagem para uma solicitação de entrada (mantida para compatibilidade)
export type JoinRequest = {
  userId: string;
  userName: string;
  // Futuramente: characterLevel, characterClass, etc.
};

// Tipagem para criação de usuário
export type UserCreateData = {
  username: string;
  email: string;
  password: string;
};

// Crie uma tipagem para os dados de login
export type LoginData = {
  username: string;
  password: string;
};

// Tipagem para os dados da mesa (pode ser movida para um arquivo de tipos no futuro)
export type TableData = {
  id: string;
  title: string;
  master: string;
  description: string;
  maxPlayers: number;
  currentPlayers?: number;
  system: string;
  date: string;
  time: string;
  players?: string[];
  type: 'online' | 'presencial';
  address?: string;
  isPrivate: boolean;
  joinRequests?: JoinRequest[];
  imageUrl?: string; // NOVO CAMPO
};

export const getTables = async (): Promise<TableData[]> => {
  const response = await apiClient.get('/tables');
  return response.data;
};

export const createTable = async (tableData: Omit<TableData, 'id'>): Promise<TableData> => {
  const response = await apiClient.post('/tables', tableData);
  return response.data;
};

export const requestToJoinTable = async (tableId: string): Promise<void> => {
  // O ID do usuário será futuramente extraído de um token de autenticação.
  // Por enquanto, o backend terá que lidar com uma identidade simulada.
  await apiClient.post(`/tables/${tableId}/join`);
};

// Função para registrar novo usuário
export const registerUser = async (userData: UserCreateData): Promise<any> => {
  const response = await apiClient.post('/register', userData);
  return response.data;
};

// Substitua a função loginUser
export const loginUser = async (credentials: LoginData): Promise<{ access_token: string }> => {
  // Agora enviamos um objeto JSON simples, não mais FormData
  const response = await apiClient.post('/token', credentials);
  return response.data;
};

export const approveJoinRequest = async (requestId: string): Promise<void> => {
  await apiClient.post(`/tables/requests/${requestId}/approve`);
};

export const declineJoinRequest = async (requestId: string): Promise<void> => {
  await apiClient.post(`/tables/requests/${requestId}/decline`);
};

// Tipagens para personagens
export type CharacterAttributes = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type CharacterData = {
  id: string;
  owner_id: string;
  name: string;
  race: string;
  character_class: string;
  level: number;
  attributes: CharacterAttributes;
};

export type CharacterCreateData = Omit<CharacterData, 'id' | 'owner_id'>;

// Funções para personagens
export const getUserCharacters = async (): Promise<CharacterData[]> => {
  const response = await apiClient.get('/characters');
  return response.data;
};

export const createCharacter = async (characterData: CharacterCreateData): Promise<CharacterData> => {
  const response = await apiClient.post('/characters', characterData);
  return response.data;
};

export const getCharacterById = async (characterId: string): Promise<CharacterData> => {
  const response = await apiClient.get(`/characters/${characterId}`);
  return response.data;
};

// Tipagens para itens
export type ItemData = {
  id: string;
  creator_id: string;
  name: string;
  description: string | null;
  type: string;
  rarity: string;
};

export type ItemCreateData = Omit<ItemData, 'id' | 'creator_id'>;

// Funções para itens
export const getUserItems = async (): Promise<ItemData[]> => {
  const response = await apiClient.get('/items/');
  return response.data;
};

export const createItem = async (itemData: ItemCreateData): Promise<ItemData> => {
  const response = await apiClient.post('/items/', itemData);
  return response.data;
};

// Tipagens para monstros
export type MonsterData = {
  id: string;
  creator_id: string;
  name: string;
  size: string;
  type: string;
  armor_class: number;
  hit_points: string;
  speed: string;
  actions: string | null;
  challenge_rating: string;
};

export type MonsterCreateData = Omit<MonsterData, 'id' | 'creator_id'>;

// Funções para monstros
export const getUserMonsters = async (): Promise<MonsterData[]> => {
  const response = await apiClient.get('/monsters/');
  return response.data;
};

export const createMonster = async (monsterData: MonsterCreateData): Promise<MonsterData> => {
  const response = await apiClient.post('/monsters/', monsterData);
  return response.data;
};

// Tipagens para NPCs
export type NpcData = {
  id: string;
  creator_id: string;
  name: string;
  description: string | null;
  role: string | null;
  location: string | null;
  notes: string | null;
};

export type NpcCreateData = Omit<NpcData, 'id' | 'creator_id'>;

// Funções para NPCs
export const getUserNpcs = async (): Promise<NpcData[]> => {
  const response = await apiClient.get('/npcs/');
  return response.data;
};

export const createNpc = async (npcData: NpcCreateData): Promise<NpcData> => {
  const response = await apiClient.post('/npcs/', npcData);
  return response.data;
};

// Tipagens para histórias
export type StoryData = {
  id: string;
  creator_id: string;
  title: string;
  synopsis: string | null;
  items: ItemData[];
  monsters: MonsterData[];
  npcs: NpcData[];
};

export type StoryCreateData = {
  title: string;
  synopsis: string | null;
  item_ids: string[];
  monster_ids: string[];
  npc_ids: string[];
};

// Funções para histórias
export const getUserStories = async (): Promise<StoryData[]> => {
  const response = await apiClient.get('/stories/');
  return response.data;
};

export const createStory = async (storyData: StoryCreateData): Promise<StoryData> => {
  const response = await apiClient.post('/stories/', storyData);
  return response.data;
};

// Funções para perfil do usuário
export const getMe = async (): Promise<UserProfileData> => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

export const updateUserMe = async (userData: UserUpdateData): Promise<UserProfileData> => {
  const response = await apiClient.put('/users/me', userData);
  return response.data;
};

export const uploadAvatar = async (avatarFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', avatarFile);
  
  const response = await apiClient.post('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateMyNotificationSettings = async (settings: NotificationSettingsData): Promise<UserProfileData> => {
  const response = await apiClient.put('/users/me/notifications', settings);
  return response.data;
};

// Função para importar dados de backup
export const importUserData = async (backupFile: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', backupFile);

  const response = await apiClient.post('/backup/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Exportar o apiClient para uso direto quando necessário
export { apiClient };