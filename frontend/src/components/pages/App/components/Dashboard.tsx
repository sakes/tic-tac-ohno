import LeaderBoards from "./LeaderBoards";
import UserSummary from "./UserSummary";
import Games from "./Games/Games";

function Dashboard() {
  return (
    <>
      <div className="w-full flex mt-8">
        <div className="flex-none mr-16">
          <UserSummary />
        </div>
        <div className="flex-1">
          <LeaderBoards />
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
