const allRecords = [];

(() => {
    const fileSystem = require('fs');
    const documentCsv = fileSystem.readFileSync('database/raza_info.csv', { encoding: 'utf-8' });

    const rows = documentCsv.trim().split('\n');
    const columns = rows.shift().split(',');

    rows.forEach((row) => {
        const helperObject = {};
        
        const cells = row.split(',');
        for (let i = 0; i < columns.length; i++) {
            helperObject[columns[i]] = cells[i];
        }

        allRecords.push(helperObject);
    });
})();

const findAll = () => { return allRecords };

const findBreed = (name) => {
    const oneRecord = allRecords.filter((breed) => {
        return breed['raza'] === name;
    });

    return oneRecord;
}

module.exports = {
    findAll,
    findBreed
}