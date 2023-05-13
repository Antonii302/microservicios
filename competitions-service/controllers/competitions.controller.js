const { findAll, findOne } = require('../models/competitions.model');

const serverReponse = (bonusMessage) => {
    return Object.assign({}, {
        answerTime: new Date(),
        microservice: 'COMPETITIONS'
    }, bonusMessage);
}

const getAllCompetitions = (req, res) => {
    const competitions = findAll();

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
    getAllCompetitions
}