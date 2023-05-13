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

module.exports = {
    getAllDogs
}