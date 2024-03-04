import { useCallback } from "react";

import SOCKET from "../../../socket/socket";

const QuitActions = () => {
  const handleForfit = useCallback((e) => {
    e.preventDefault();
    SOCKET.forfitGame();
  }, []);

  const handleForceComplete = useCallback((e) => {
    e.preventDefault();
    SOCKET.forceComplete();
  }, []);

  return (
    <div className="whitespace-nowrap text-sm font-medium text-center">
      <button
        type="button"
        onClick={handleForfit}
        className="
            inline-flex 
            items-center 
            gap-x-2 
            text-sm 
            font-semibold 
            rounded-lg 
            border 
            border-transparent 
            text-orange-600 
            hover:text-orange-800 
            hover:border-orange-700
            disabled:opacity-50 
            disabled:pointer-events-none 
            dark:text-orange-500 
            dark:hover:text-orange-400 
            dark:hover:border-orange-300
            dark:focus:outline-none 
            dark:focus:ring-1 
            dark:focus:ring-gray-600"
      >
        quit
      </button>
      <button
        type="button"
        onClick={handleForceComplete}
        className="
            inline-flex 
            items-center 
            gap-x-2 
            text-sm 
            font-semibold 
            rounded-lg 
            border 
            border-transparent 
            text-blue-600 
            hover:text-blue-800 
            hover:border-blue-700
            disabled:opacity-50 
            disabled:pointer-events-none 
            dark:text-blue-500 
            dark:hover:text-blue-400 
            dark:hover:border-blue-300
            dark:focus:outline-none 
            dark:focus:ring-1 
            dark:focus:ring-gray-600"
      >
        force complete
      </button>
    </div>
  );
};

export default QuitActions;
