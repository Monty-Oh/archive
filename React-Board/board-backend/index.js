const { app, port } = require("./src/app");

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
