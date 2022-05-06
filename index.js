const http = require("http");
const app = require("./app");
const PORT = 9001;
const connectToDB = require("./mongodb");

http.createServer(app).listen(PORT, () => {
  new connectToDB();
  console.log(`Server is running at port no. ${PORT}`);
});