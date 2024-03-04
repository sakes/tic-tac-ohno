import { create } from 'zustand';

const useGame = create()((set, get) => ({
    game: undefined,
    setGame: (game) => set(() => ({ game }))
}));

export default useGame;