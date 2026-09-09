const express = require('express');
const cors = require("cors");
const mongodb = require("./data/database");
const app = express();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }

  else {
    app.listen(port, () => (console.log(`Server is running on port ${port}`)));
  }
});