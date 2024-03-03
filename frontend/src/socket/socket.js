import io from "socket.io-client";
import urls from "../api/urls";

import ACTIONS from './actions';
import useSession from '../state/session';
import useDashboard from "../state/dashboard";

class Socket {
    constructor() {
        this.open();
    }

    open() {
        if (!this.isOpen) {
            this.s = io(urls.ws);
            this.isOpen = true;
            this.attachEvents();
        }
    }

    close() {
        if (this.isOpen) {
            this.removeEvents();
            this.s.disconnect();
            this.s = undefined;
            this.isOpen = false;
        }
    }

    bootstrap() {
        this.open();
        this.registerUser();
        this.getUserSummary();
        this.getLeaderboards();    
    }

    throwErrorMissingSocket() {
        if (!this.isOpen || !this.s) {
            throw new Error('Socket Singleton Error: The socket does not exist or is not open');
        }
    }

    // USER ACTIONS

    registerUser() {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!userId) {
            throw new Error('Socket Singleton Error: attempted to register user when no user is logged in.')
        }
        this.s.emit(ACTIONS.USER.REGISTER, userId);
    }

    unregisterUser() {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!userId) {
            throw new Error('Socket Singleton Error: attempted to unregister user when no user is logged in.')
        }
        this.s.emit(ACTIONS.USER.UNREGISTER, userId);
    }

    // USER SUMMARY ACTIONS
    getUserSummary() {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!userId) {
            throw new Error('Socket Singleton Error: attempted to unregister user when no user is logged in.')
        }
        this.s.emit(ACTIONS.USER.GET_SUMMARY, userId);
    }

    // GAME ACTIONS

    createGame() {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!userId) {
            throw new Error('Socket Singleton Error: attempted to create a game when no user is logged in.')
        }
        this.s.emit(ACTIONS.GAME.CREATE, userId);
    }

    joinGame(gameId) {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!gameId) {
            throw new Error('Socket Singleton Error: attempted to join a game but gameId is missing.')
        }
        if (!userId) {
            throw new Error('Socket Singleton Error: attempted to join a game when no user is logged in.')
        }
        this.s.emit(ACTIONS.GAME.JOIN, userId);
    }


    // LEADERBOARD ACTIONS
    getLeaderboards() {
        this.throwErrorMissingSocket();
        const userId = useSession.getState().user?.id;
        if (!userId) {
            throw new Error('Socket Singleton Error: attempting to request leaderboard data without user id.')
        }
        this.s.emit(ACTIONS.LEADERBOARDS.LIST, userId);
    }

    // SOCKET EVENT HANDLERS
    attachUserEvents() {
        this.s.on(ACTIONS.USER.GET_SUMMARY, (summary) => {
            useDashboard.getState().setUserSummary(summary);
        })
    }

    attachLeaderboardEvents() {
        this.s.on(ACTIONS.LEADERBOARDS.LIST, (rows) => {
            useDashboard.getState().setLeaderboards(rows);
        })
    }

    attachGameEvents() {
        this.s.on(ACTIONS.GAMES.LIST, (rows) => {
            useDashboard.getState().setGames(rows);
        })
    }

    attachEvents() {
        this.attachUserEvents();
        this.attachLeaderboardEvents();
        this.attachGameEvents();
    }

    removeEvents() {
        this.s.off(ACTIONS.USER.GET_SUMMARY)
        this.s.off(ACTIONS.LEADERBOARDS.LIST)
        this.s.off(ACTIONS.GAMES.LIST)
    }
}

export default new Socket();