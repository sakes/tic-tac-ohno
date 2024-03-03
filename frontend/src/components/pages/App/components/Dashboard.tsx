import LeaderBoards from "./LeaderBoards";
import UserSummary from "./UserSummary";
import Games from "./Games/Games";

function Dashboard() {
  return (
    <>
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
    </>
  );
}

export default Dashboard;
