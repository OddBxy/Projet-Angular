const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.listeGet = async function(req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        let datas = await dbo.collection("listes").find({}).toArray();
        res.status(200).json(datas);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.listePost = async function(req, res, next) {
    let liste = req.body
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        await dbo.collection("listes").insertOne(liste);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.listePut = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        await dbo.collection("listes").updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: { titre: req.body.titre, statut: req.body.statut, Taches: req.body.Taches } });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};