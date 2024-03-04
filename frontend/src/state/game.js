import { create } from 'zustand';

const useGame = create()((set, get) => ({
    // props
    game: undefined,
    nextPlayerId: undefined,

    // ac
    setGame: (game) => set(() => ({ game })),
    setState: (game, nextPlayerId) => set(() => ({ game: (game || undefined), nextPlayerId: (nextPlayerId || undefined) })),
    clear: () => set(() => ({ game: undefined, nextPlayerId: undefined})),

    // selectors
    selectNextPlayerId: () => {
        const { game, nextPlayerId } = get();
        return nextPlayerId === game?.opponent_user_id ? game?.opponent_user_id : (game?.owner_user_id || undefined);
    },
}));

export default useGame;