require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const pc = require("./controllers/propertyCtrl");
const uc = require("./controllers/userCtrl");
const ec = require("./controllers/expenseCtrl");
const vc = require("./controllers/visionCtrl");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  GOOGLE_APPLICATION_CREDENTIALS,
  PROJECT_ID,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;
const { userInit } = require("./customMiddleware/initSession");
const { Storage } = require("@google-cloud/storage");
const vision = require("@google-cloud/vision");
const aws = require('aws-sdk');

const app = express();
app.use(express.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("db is all good");
    app.listen(SERVER_PORT, () =>
      console.log(`${SERVER_PORT} is good in the hood`)
    );
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

///property endpoints\\\
app.get("/api/properties", userInit, pc.getUsersProperties);

///user endpoint\\\
app.post("/api/register", uc.register);
app.post("/api/login", userInit, uc.login);
app.delete("/api/logout", uc.logout);
app.get("/api/user", userInit, uc.getUser);

///expense endpoints\\\\
app.get("/api/expenses", ec.getUserExpenses);
app.get("/api/monthly/expenses/:pId/:month/:year", ec.getMonthPropExpenses);
app.post("/api/expense/:propertyId", ec.addExpense);
app.post('/api/expense/noimage/:propertyId', ec.addExpenseNoImage)

//////////

app.post("/api/image", vc.getImageData);

/////////////////
app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});