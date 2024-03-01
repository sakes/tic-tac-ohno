import AppHeader from "../AppHeader";
import AppBody from "../AppBody";

import LeaderBoards from "./components/LeaderBoards";
import UserSummary from "./components/UserSummary";
import Games from "./components/Games/Games";

import "./App.css";

function App() {
  return (
    <>
      <AppHeader />
      <AppBody id="page-app">
        <div className="w-full flex">
          <div className="flex-1 bg-red-500">
            <LeaderBoards />
          </div>
          <div className="flex-none bg-blue-500 w-[400px]">
            <UserSummary />
          </div>
        </div>
        <br />
        <div className="w-full flex">
          <div className="flex-1 bg-green-500">
            <Games />
          </div>
        </div>
      </AppBody>
    </>
  );
}

export default App;
