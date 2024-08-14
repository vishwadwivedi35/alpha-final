const app = require("./app");
const http = require("http");
const PORT = 9000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
