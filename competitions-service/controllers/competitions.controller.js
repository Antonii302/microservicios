const needle = require('needle');
const { findAll, findByChampionId, findOneById, findByTopFive } = require('../models/competitions.model');

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
    
    return res.status(200).send({ data: competitions });
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

const getChampiosByTopFive = async (req, res) => {
    const topWinners = findByTopFive();

    const helperObject = {};

    if (topWinners.every(winner => !winner)) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado registro alguno',
            data: 'Vacío'
        }));
    }
    
    const coatColors = [];
    const promises = topWinners.map(async (competition) => {
        const dog = await needle(`http://dogs:4000/api/v1/dogs/${competition['id_campeon']}`);
        competition['perroInfo'] = dog.body.data;
        
        if (competition['perroInfo']) {
            const breed = await needle(`http://breeds:3000/api/v1/breeds/breed/${competition['perroInfo']['raza']}`);
            const breedClean = breed.body.data[0];

            coatColors.push(breedClean['color_de_pelo'].split(/;(?!.*\))/));
        }

        return competition;
    });


    helperObject['Perros'] = await Promise.all(promises);
    
    const colors = coatColors.flat();
    console.log('hiiii', colors)
    const count = {};

    colors.forEach((color) => { count[color] = (count[color] || 0) + 1 });

    let mostCommonColor = '';
    let maxCount = 0;

    for (let color in count) {
        if (count[color] > maxCount) { 
            mostCommonColor = color;
            maxCount = count[color];
        }
    }
    helperObject['colorComún'] = mostCommonColor;

    return res.status(200).send(serverReponse({
        data: helperObject
    }));
};

module.exports = {
    getAllCompetitions,
    getCompetitionsByChampionId,
    getChampiosByTopFive,
    getCompetitionById
}