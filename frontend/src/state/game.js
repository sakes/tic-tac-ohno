import { create } from 'zustand';

const useGame = create()((set, get) => ({
    // props
    game: undefined,
    nextPlayerId: undefined,
    refreshPending: false,

    // ac
    setGame: (game) => set(() => ({ game })),
    setRefeshPending: (refreshPending) => set(() => ({ refreshPending: refreshPending || false })),
    setState: (game, nextPlayerId, refreshPending) => set(() => (
        { 
            game: (game || undefined), 
            nextPlayerId: (nextPlayerId || undefined), 
            refreshPending: (refreshPending || false) 
        }
    )),
    clear: () => set(() => ({ game: undefined, nextPlayerId: undefined})),

    // selectors
    selectNextPlayerId: () => {
        const { game, nextPlayerId } = get();
        return nextPlayerId === game?.opponent_user_id ? game?.opponent_user_id : (game?.owner_user_id || undefined);
    },
}));

export default useGame;