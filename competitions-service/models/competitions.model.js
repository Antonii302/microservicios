const sqlite = require('better-sqlite3');
const database = sqlite('database/competitions.db');

(() => {
    const fyleSystem = require('fs');
    const sqlScript = fyleSystem.readFileSync('database/premios.sql', 'utf-8');

    const sqlStatements = sqlScript.split(';');
    sqlStatements.forEach((statement) => {
        if (statement.trim()) {
            database.exec(statement);
        }
    });
})();

const findAll = () => {
    const query = database.prepare('SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje  FROM campeonatos ORDER BY id_campeon ASC');
    const allRecords = query.all();
    
    database.close();
    return allRecords;
}

module.exports = {
    findAll
}