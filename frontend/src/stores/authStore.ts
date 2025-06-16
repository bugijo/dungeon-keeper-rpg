import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  username: string;
  userId: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  login: (token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  token: null,
  user: null,
  login: (token: string) => {
    const decoded: { sub: string, user_id: string } = jwtDecode(token);
    const userProfile: UserProfile = { username: decoded.sub, userId: decoded.user_id };
    
    localStorage.setItem('authToken', token);
    set({ token, user: userProfile });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, user: null });
  },
  initialize: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: { sub: string, user_id: string, exp: number } = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        const userProfile: UserProfile = { username: decoded.sub, userId: decoded.user_id };
        set({ token, user: userProfile });
      } else {
        localStorage.removeItem('authToken');
      }
    }
  },
}));

// Inicializa a store para verificar se já existe um token no localStorage
useAuthStore.getState().initialize();