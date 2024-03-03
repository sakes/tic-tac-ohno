import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

import urls from "../../../api/urls";

import CheckRestApi from "../../CheckRestApi";

import "./App.css";

// const socket = io(urls.ws);

function App() {
  const [message, setMessage] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // socket.on("message", (msg) => {
    //   console.log("heeeer");
    //   setMessage(msg);
    // });
    // return () => {
    //   socket.off("message");
    // };
  }, []);

  const sendMessage = useCallback(() => {
    // console.log("send message via ws");
    // socket.emit("message", "from da client mon");
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <button
        className="bg-indigo-500 w-[200px] h-[100px] inline-block"
        onClick={sendMessage}
      >
        {message}
      </button>
      <CheckRestApi />
      <hr />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
