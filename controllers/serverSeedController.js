const { validationResult } = require('express-validator');
const ServerSeedInfo = require('../models/ServerSeedInfo');

// UpdateServerSeedInfo
exports.updateServerSeedInfo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, hash } = req.body;
    const { _id } = req.params;
    try {
        await ServerSeedInfo.findByIdAndUpdate(_id, {
            id,
            hash,
        }).then(result => {
            return res.status(200).json(result.data);
        }).catch(error => {
            console.log(error);
        })
    } catch (err) {
        console.log('# error => ', error);
        return res.status(500).send('Server error');
    }
};
//Insert ServerSeed Info
exports.insertServerSeedInfo = async (req, res) => {
    const { id, hash } = req.body;
    console.log(id, hash);
    try {
        let serverSeedInfo = new ServerSeedInfo({ id, hash });
        const result = await serverSeedInfo.save();
        return res.status(200).json(result);
    } catch (err) {
        console.log('# error => ', error);
        return res.status(500).send('Server Error');
    }
};
//
exports.getServerSeedInfoById = (req, res) => {
    const { _id } = req.params;
    ServerSeedInfo.findById(_id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(error => {
            console.log('# error => ', error);
            return res.status(500).send('Error!');
        })
}

exports.getAllServerSeedInfo = (req, res) => {
    ServerSeedInfo.find()
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(error => {
            console.log('# error => ', error);
            return res.status(500).send('Error!');
        })
}

exports.generateHashChain = async (req, res) => {
    const serverSeedHash = []
    let id = 1;
    serverSeedHash[0] = "20e743b4dbec24efd5112f951145d1e415e2b040bf3c3816df67cfcac6b45e1d"
    let serverSeedInfo = new ServerSeedInfo({ id }, serverSeedHash[0]);
    await serverSeedInfo.save();
    for (let i = 1; i < 1000000; i ++) {
        serverSeedHash[i].push(createHmac("sha256", serverSeedHash[i-1]));
        id = id + 1;
        serverSeedInfo = new ServerSeedInfo( { id }, serverSeedHash[i] );
        await serverSeedInfo.save();
    }
    console.log("serverSeedInfo", serverSeedHash);
    return res.status(200).json("success");
}