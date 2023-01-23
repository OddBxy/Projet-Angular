const express = require('express');
const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const { tacheGet, tachePost, tacheDelete, tachePut} = require('./tacheController');
const { signIn, login, logout, isConnected, getUser, updateUser, getAllUsers } = require("./authController")
const {listeGet, listePost, listePut, listeDelete} = require("./listesController")
const cors = require('cors')

const url = "mongodb://127.0.0.1:27017/";
const app = express();
const port = 3000;

app.use(session({
    secret: "chut, c'est un secret",
    name: "cookieTacheApplication"
}));


app.use(bodyParser.json());


app.use(cors({ credentials: true, origin: 'http://localhost:4200' }))

function checkSignIn(req, res, next) {
    if (req.session.user) {
        next(); //Si la session existe on passe à la callback suivante
    } else {
        res.status(401).send("Unauthorized");
    }
}


app.post('/signin', signIn);
app.post('/login', login);
app.post('/logout', logout);
app.get('/isConnected', checkSignIn, isConnected);
app.get('/getAllUsers', getAllUsers);
app.post('/getUser', getUser);
app.put('/updateUser/:id', updateUser);

app.get('/taches', checkSignIn, tacheGet);
app.post('/taches', checkSignIn, tachePost);
app.delete('/taches/:id', checkSignIn, tacheDelete);
app.put('/taches/:id', checkSignIn, tachePut);


app.get('/listes', listeGet); 
app.post('/listes', listePost);
app.put('/listes/:id', listePut);
app.delete('/listes/:id', listeDelete)


app.listen(port, () => {
    console.log(`L'application écoute le port ${port}`)
})