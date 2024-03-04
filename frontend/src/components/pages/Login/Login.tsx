import { useState, useCallback } from "react";
import { fpostLogin } from "../../../api/rest";

import useSession from "../../../state/session.js";

import "../App/App.css";

const Login = () => {
  const setLogin = useSession((state) => state.setLogin);
  const [username, setUsername] = useState("");

  const handleUsernameChange = useCallback(
    (e) => {
      setUsername((e.target?.value || "").trim());
    },
    [setUsername]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (username && username.length > 0) {
        const fnLogin = async () => {
          const user = await fpostLogin(username);
          setLogin(user);
        };
        fnLogin();
      }
    },
    [username]
  );

  return (
    <div id="page-login">
      <h1 className="mb-10 text-purple-300">
        tic-tac-ohno <br />
      </h1>
      <form onSubmit={onSubmit} className="min-w-[300px]">
        <div className="relative">
          <input
            type="text"
            id="username"
            placeholder=" "
            onChange={handleUsernameChange}
            className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="username"
            className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Username
          </label>
        </div>
        <div className="w-full relative pt-14">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-block absolute right-0"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
