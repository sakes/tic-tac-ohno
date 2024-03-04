import LeaderBoards from "./LeaderBoards";
import UserSummary from "./UserSummary";
import Games from "./Games";

function Dashboard() {
  return (
    <>
      <div className="w-full flex mt-8 flex-col md:flex-row">
        <div className="flex-none md:mb-0 md:mr-16">
          <UserSummary />
        </div>
        <div className="flex-1">
          <LeaderBoards />
        </div>
      </div>
      <br />
      <br />
      <br />
      <hr className="opacity-30" />
      <div className="w-full flex">
        <div className="flex-1 ">
          <Games />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
