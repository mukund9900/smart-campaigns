"use strict";
//create server
const { createServer } = require("http");
const HTTP_PORT = process.env.PORT || 3000;

//set up next
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

// prepare and serve
app.prepare().then(() => {
  createServer(handler).listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`NODE SERVER: serving on port number ${PORT}`);
  });
});
