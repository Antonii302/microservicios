const { findAll, findByChampionId, findOneById } = require('../models/competitions.model');

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

const getCompetitionsByChampionId = (req, res) => {
    const { champion_id } = req.params;
    const competitions = findByChampionId(champion_id);
    
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

const getCompetitionById = (req, res) => {
    const { id } = req.params;
    const competition = findOneById(id);

    if (competition === null || competition === undefined) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
            data: 'Vacío'
        }));
    }
    
    return res.status(200).send(serverReponse({
        dataLength: competition.length,
        data: competition
    }));
};

module.exports = {
    getAllCompetitions,
    getCompetitionsByChampionId,
    getCompetitionById
}