import useDashboard from "../../../../state/dashboard";

const UserSummary = () => {
  const { wins, losses, ties } = useDashboard((state) => {
    return {
      wins: state?.userSummary?.wins,
      losses: state?.userSummary?.losses,
      ties: state?.userSummary?.ties,
    };
  });
  return (
    <>
      <h1 className="text-blue-200 text-[2em] text-opacity-70 mb-5">
        My Stats
      </h1>
      <div className="text-center bg-blue-500 bg-opacity-10 w-[400px] flex">
        <div className="flex-auto text-green-500 p-10">
          <h1>{wins}</h1>
          <br />
          wins
        </div>
        <div className="flex-auto text-orange-500 py-10">
          <h1>{losses}</h1>
          <br />
          losses
        </div>
        <div className="flex-auto text-blue-500 p-10">
          <h1>{ties}</h1>
          <br />
          ties
        </div>
      </div>
    </>
  );
};

export default UserSummary;
