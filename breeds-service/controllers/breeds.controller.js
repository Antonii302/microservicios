const { findAll } = require('../models/breeds.model');

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
module.exports = {
    getAllBreeds
}