import { UserCircleIcon } from "@heroicons/react/20/solid";
import useSession from "../../state/session";
import { useCallback } from "react";

const AppHeader = () => {
  const { setLogout, username } = useSession((state) => ({
    setLogout: state.setLogout,
    username: state.user?.username || "",
  }));

  const handleLogout = useCallback(() => {
    setLogout();
  }, [setLogout]);

  return (
    <div className="app-header px-7 py-5 border-b border-purple-300 border-opacity-30">
      <div className="flex">
        <h1 className="flex-none self-center text-purple-400 text-[2em]">
          tic-tac-ohno
        </h1>
        <div className="flex-auto"></div>
        <UserCircleIcon className="flex-none h-8 w-8 mr-2 self-center" />
        <h1 className="flex-none text-[1.5em] self-center mr-7">{username}</h1>
        <div className="flex-none">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
