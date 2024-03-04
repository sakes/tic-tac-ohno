import useDashboard from "../../../state/dashboard";
import useSession from "../../../state/session";

const UserSummary = () => {
  const username = useSession((state) => state.user?.username);
  const { wins, losses, ties } = useDashboard((state) => {
    return {
      wins: state?.userSummary?.wins,
      losses: state?.userSummary?.losses,
      ties: state?.userSummary?.ties,
    };
  });
  return (
    <>
      <h1 className="text-center md:text-left text-blue-200 text-[2em] text-opacity-70">
        {username} Stats
      </h1>
      <div className="text-center w-[400px] flex mx-auto pr-0 lg:pr-10">
        <div className="flex-auto text-green-500 pr-10 py-10">
          <h1>{wins}</h1>
          <br />
          wins
        </div>
        <div className="flex-auto text-orange-500 py-10">
          <h1>{losses}</h1>
          <br />
          losses
        </div>
        <div className="flex-auto text-blue-500 pl-10 py-10">
          <h1>{ties}</h1>
          <br />
          ties
        </div>
      </div>
    </>
  );
};

export default UserSummary;
