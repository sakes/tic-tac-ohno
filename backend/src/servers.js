const { createRestServer } = require("./rest");
const { createWsServer } = require("./socket");

createRestServer();
createWsServer();