import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Player = {
  id: string;
  type: 'player';
  name: string;
};

type PlayerStore = {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayer: (updatedPlayer: Player) => void;
  removePlayer: (id: string) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      players: [
        { id: '1', name: 'John Lloyd', type: 'player' },
        { id: '2', name: 'Paige Lycanon', type: 'player' },
        { id: '3', name: 'Rei Berry', type: 'player' },
      ],
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