let allRecords = null;

(() => {
    const fileSystem = require('fs');
    const documentJSON = fileSystem.readFileSync('database/datos_perro.json', { encoding: 'utf-8' });

    allRecords = JSON.parse(documentJSON);
})();

const findAll = () => { return allRecords; };

const findByOwnerCountry = (country) => {
    const someRecords = allRecords.filter((dog) => { return dog['pais_origen_dueno'] === country; });
    return someRecords;
};

const findById = (id) => {
    const oneRecord = allRecords.find((dog) => { return dog['Id'].toString() === id });
    return oneRecord;
};

module.exports = {
    findAll,
    findByOwnerCountry,
    findById
}