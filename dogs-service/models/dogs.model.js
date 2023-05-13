let allRecords = null;

(() => {
    const path = require('path');

    const fileSystem = require('fs');
    const documentJSON = fileSystem.readFileSync('database/datos_perro.json', { encoding: 'utf-8' });

    allRecords = JSON.parse(documentJSON);
})();

const findAll = () => { return allRecords; };

module.exports = {
    findAll
}