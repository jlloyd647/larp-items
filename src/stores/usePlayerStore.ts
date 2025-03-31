import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Player = {
  id: string;
  type: 'player';
  name: string;
};

type PlayerStore = {
  players: Player[];
  getPlayerById: (id: string) => Player | undefined;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (updatedPlayer: Player) => void;
  removePlayer: (id: string) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      players: [],
      getPlayerById: (id) => get().players.find((player) => player.id === id),
      setPlayers: (players: Player[]) => set({ players }),
      addPlayer: (player) =>
        set((state) => ({ players: [...state.players, player] })),
      updatePlayer: (updatedPlayer) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === updatedPlayer.id ? updatedPlayer : p
          ),
        })),
      removePlayer: (id) =>
        set((state) => ({ players: state.players.filter((p) => p.id !== id) })),
    }),
    
    {
      name: 'player-storage',
    }
  )
);