/** @format */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

const app = express();

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(express.json());

//post endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/api/treasure/user', auth.userOnly, treaureCtrl.addUserTreasure);
//get endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/auth/logout', authCtrl.logout);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.get(
  '/api/treasure/all',
  auth.usersOnly,
  auth.adminsOnly,
  treausreCtrl.getAllTreasure
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then(db => {
  app.set('db', db);
  console.log('Everythings is looking good ');
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
