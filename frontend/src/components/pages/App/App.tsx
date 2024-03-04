import { useEffect } from "react";

import AppHeader from "../AppHeader";
import AppBody from "../AppBody";
import Dashboard from "./components/Dashboard";
import Game from "./components/Game";

import SOCKET from "../../../socket/socket";
import useGame from "../../../state/game";

import "./App.css";

function App() {
  useEffect(() => {
    SOCKET.bootstrap();

    return () => {
      SOCKET.close();
    };
  }, []);

  const game = useGame((state) => state.game);

  return (
    <>
      <AppHeader />
      <AppBody id="page-app">
        {!game && <Dashboard />}
        {!!game && <Game />}
      </AppBody>
    </>
  );
}

export default App;
