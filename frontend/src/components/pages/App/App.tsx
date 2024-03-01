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
          <div className="flex-1">
            <LeaderBoards />
          </div>
          <div className="flex-none bg-blue-500 bg-opacity-10 w-[400px] ml-7 text-center p-20">
            <UserSummary />
          </div>
        </div>
        <br />
        <div className="w-full flex">
          <div className="flex-1 ">
            <Games />
          </div>
        </div>
      </AppBody>
    </>
  );
}

export default App;
