import { useEffect, useState } from "react";

import { fgetHelloWorld } from "../api/rest";

const CheckRestApi = () => {
  const [msg, setMsg] = useState("checking rest api");

  useEffect(() => {
    const get = async () => {
      const message = await fgetHelloWorld();
      setMsg(message);
    };
    get();
  }, []);

  return <div>{msg}</div>;
};

export default CheckRestApi;
