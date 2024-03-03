const { createRestServer } = require("./rest");
const { createWsServer } = require("./socket/socket");

createRestServer();
createWsServer();