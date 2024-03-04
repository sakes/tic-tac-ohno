import { useMemo } from "react";
import useDashboard from "../../../state/dashboard";

const Row = ({ idx, userSummary }) => {
  const lastSeen = useMemo(() => {
    if (userSummary.updated_date) {
      return new Date(userSummary.updated_date).toISOString().split("T")[0];
    }
    return null;
  }, userSummary);
  return (
    <tr>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {idx + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {userSummary?.username}
      </td>
      <td className="hidden md:table-cell lg:hidden px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {userSummary?.wins} / {userSummary?.losses} / {userSummary?.ties}
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {userSummary?.wins}
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {userSummary?.losses}
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {userSummary?.ties}
      </td>
      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        {lastSeen}
      </td>
    </tr>
  );
};

const LeaderBoards = () => {
  const leaderboards = useDashboard((state) => state?.leaderboards || []);
  return (
    <div className="hidden md:block">
      <h1 className=" text-purple-300 text-[2em] text-opacity-75 mb-5">
        The Best Around
      </h1>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell lg:hidden px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      W L T
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Wins
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Losses
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Ties
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Last Seen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {leaderboards.map((userSummary, idx) => (
                    <Row idx={idx} userSummary={userSummary} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoards;
