const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const cors = require('cors')

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const characterRouter = require('./routes/characters.router');
const bossRouter = require('./routes/bosses.router');
const userCharactersRouter = require('./routes/userCharacters.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/getCharacters', characterRouter);
app.use('/getBosses', bossRouter);
app.use('/getUserCharacters', userCharactersRouter);
app.use('/postUserCharacter', userCharactersRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
