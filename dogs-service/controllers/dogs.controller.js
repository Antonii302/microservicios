const needle = require('needle');
const { findAll, findByOwnerCountry, findById } = require('../models/dogs.model');

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

const getByOwnerCountry = async (req, res) => {
    const { country } = req.params;
    const dogs = findByOwnerCountry(country);
    
    const helperObject = {};

    if (dogs.every(dog => !dog)) {
        return res.status(404).send(serverReponse({
            message: 'Lo sentimos. No hemos encontrado registro alguno',
            data: 'Vacío'
        }));
    }
    const promises = dogs.map(async (dog) => {
        const breed = await needle(`http://breeds:3000/api/v1/breeds/breed/${dog['raza']}`);
        dog['razaInfo'] = breed.body.data[0];

        const competitions = await needle(`http://competitions:5000/api/v1/competitions/dogs/${dog['Id']}`);
        dog['campeonatosGanados'] = competitions.body.data;
        
        return dog;
    });

    helperObject['Perros'] = await Promise.all(promises);

    return res.status(200).send(serverReponse({
        data: helperObject
    }));
};

const getById = (req, res) => {
    const { id } = req.params;
    const dog = findById(id);

    return res.status(200).send(serverReponse({
        data: dog
    }));
}

module.exports = {
    getAllDogs,
    getByOwnerCountry,
    getCompetitionsById,
    getById
}