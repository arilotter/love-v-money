const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const flatfile = require("flat-file-db");

const { getRandom } = require("./random");

const DB_PATH = path.resolve(__dirname, "..", "userdata.db");
const db = flatfile.sync(DB_PATH);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.put("/api/people", (req, res) => {
  const guid = req.body.guid;
  delete req.body.guid;
  db.put(guid, req.body);
  res.sendStatus(200);
});

const getPeople = (req, res) => {
  const myID = req.body.guid;
  const me = db.get(myID);

  const strangerIDs = db.keys();
  const strangerCount = Math.min(strangerIDs.length, 10);
  let strangerKeys = getRandom(strangerIDs, strangerCount);
  if (myID) strangerKeys = strangerKeys.filter(id => id !== myID);
  const strangers = strangerKeys.map(key => db.get(key));

  res.send({ strangers, me });
};

app.post("/api/people", getPeople);
app.get("/api/people", getPeople);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
