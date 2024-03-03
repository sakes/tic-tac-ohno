import { create } from 'zustand';

const useDashboard = create()((set, get) => ({
    userSummary: undefined,
    leaderboards: [],
    games: [],
    setUserSummary: (userSummary) => set(() => ({ userSummary })),
    setLeaderboards: (leaderboards) => set(() => ({ leaderboards })),
    setGames: (games) => set(()=>{ games}),
}));

export default useDashboard;