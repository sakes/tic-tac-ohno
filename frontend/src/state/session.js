import { create } from 'zustand';

const useSession = create()((set, get) => ({
    user: undefined,
    setLogin: (user) => set(() => ({ user })),
    setLogout: ()  => set(() => ({ user: undefined }))
}));

export default useSession;