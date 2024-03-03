import AppHeader from "../AppHeader";
import AppBody from "../AppBody";

import Dashboard from "./components/Dashboard";

import SOCKET from "../../../socket/socket";

import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    SOCKET.bootstrap();

    return () => {
      SOCKET.close();
    };
  }, []);

  return (
    <>
      <AppHeader />
      <AppBody id="page-app">
        <Dashboard />
      </AppBody>
    </>
  );
}

export default App;
