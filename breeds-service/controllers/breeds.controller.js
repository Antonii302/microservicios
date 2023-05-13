const { findAll, findBreed } = require('../models/breeds.model');

const serverReponse = (bonusMessage) => {
    return Object.assign({}, {
        answerTime: new Date(),
        microservice: 'BREEDS'
    }, bonusMessage);
}

const getAllBreeds = (req, res) => {
    const breeds = findAll();

    if (breeds.every(competition => !competition)) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado registro alguno',
            data: 'Vacío'
        }));
    }
    
    return res.status(200).send(serverReponse({
        dataLength: breeds.length,
        data: breeds
    }));
};

const getBreed = (req, res) => {
    const { name } = req.params;

    const breed = findBreed(name);

    if (breed === null || breed === undefined) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
            data: 'Vacío'
        }));
    }
    
    return res.status(200).send(serverReponse({
        dataLength: breed.length,
        data: breed
    }));
};

module.exports = {
    getAllBreeds,
    getBreed
}