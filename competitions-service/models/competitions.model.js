const sqlite = require('better-sqlite3');
// const database = sqlite('database/competitions.db');

(() => {
    const database = sqlite('database/competitions.db');

    const fyleSystem = require('fs');
    const sqlScript = fyleSystem.readFileSync('database/premios.sql', { encoding: 'utf-8' });

    const sqlStatements = sqlScript.split(';');
    sqlStatements.forEach((statement) => {
        if (statement.trim()) {
            database.exec(statement);
        }
    });
})();

const findAll = () => {
    const database = sqlite('database/competitions.db');

    const query = database.prepare('SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje  FROM campeonatos ORDER BY id_campeon ASC');
    const allRecords = query.all();
    
    database.close();
    return allRecords;
}

const findByChampionId = (champion_id) => {
    const database = sqlite('database/competitions.db');

    const query = database.prepare('SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE id_campeon = ?');
    const someRecords = query.all(champion_id);

    database.close();
    return someRecords;
};

const findOneById = (id) => {
    const database = sqlite('database/competitions.db');

    const query = database.prepare('SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje FROM campeonatos WHERE id = ?');
    const oneRecord = query.get(id);

    database.close();
    return oneRecord;
};

const findByTopFive = () => {
    const database = sqlite('database/competitions.db');

    const query = database.prepare('SELECT id, id_campeon, anio_campeonato, lugar, categoria_ganada, pais_competencia, premio, puntaje, COUNT(*) as competitions_won FROM campeonatos GROUP BY id_campeon ORDER BY competitions_won DESC LIMIT 5');
    const someRecords = query.all();

    database.close();
    return someRecords;    
};

module.exports = {
    findAll,
    findByChampionId,
    findOneById,
    findByTopFive
}