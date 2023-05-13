const { findAll } = require('../models/dogs.model');

const serverReponse = (bonusMessage) => {
    return Object.assign({}, {
        answerTime: new Date(),
        microservice: 'DOGS'
    }, bonusMessage);
}

const getAllDogs = (req, res) => {
    const dogs = findAll();

    if (dogs.every(dog => !dog)) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado registro alguno',
            data: 'Vacío'
        }));
    }
    
    return res.status(200).send(serverReponse({
        dataLength: dogs.length,
        data: dogs
    }));
};

const getCompetitionsById = async (req, res) => {
    const needle = require('needle');

    const { id } = req.params;
    const competitions = (await needle(`http://competitions:5000/api/v1/competitions/dogs/${id}`)).body.data;
    
    if (competitions.every(competition => !competition)) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado registro alguno',
            data: 'Vacío'
        }));
    }
    
    return res.status(200).send(serverReponse({
        dataLength: competitions.length,
        data: competitions
    }));
};

module.exports = {
    getAllDogs,
    getCompetitionsById
}