import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type Player } from './types';

export const usePlayersStore = create<{
  playersList: string[];
  setPlayersList: (playersList: string[]) => void;
}>()(
  persist(
    set => ({
      playersList: [],
      setPlayersList: playersList => set({ playersList }),
    }),
    { name: 'players-storage' }
  )
);

export const useGameStore = create<{
  players: Player[];
  setPlayers: (players: Player[]) => void;
}>()(set => ({
  players: [],
  setPlayers: players => set({ players }),
}));
