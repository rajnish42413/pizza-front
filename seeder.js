const config = require('./knexfile'),
    Knex = require('knex'),
    path = require('path'),
    chalk = require('chalk');

const seederFile = path.resolve('./migrations/seeds', process.argv[2]);
const seeder = require(seederFile);
(async() => {
    console.log(chalk.blue('Seeding: ' + seederFile));
    const knex = Knex(config);

    if (process.argv.length > 3) {
        await seeder.seed(knex, Promise, Number.parseInt(process.argv[3], 10));
    } else {
        await seeder.seed(knex, Promise);
    }

    console.log(chalk.green('Seeding has been Completed'));
    await knex.destroy();
})();