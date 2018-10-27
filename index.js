'use strict';

const FileSystem = require('fs');
const Chalk = require('chalk');

/** localpkg packages */
const TerminalHelper = require('localpkg-core').TerminalHelper;

/** Service */
const MigrationsListService = require('./src/migrations.List.Service');
const MigrationsRunService = require('./src/migrations.Run.Service');


const operation = TerminalHelper.getTerminalArgumentValue('o');


if (operation === 'list') {

    const migrationsLocation = TerminalHelper.getTerminalArgumentValue('ml');

    MigrationsListService.getMigrations(migrationsLocation)
        .then((migrations) => {
            migrations = MigrationsListService.sortChronologically(migrations);
            MigrationsListService.display(migrations);
        });

} else if (operation === 'run') {

    let cliParameters = {};
    cliParameters.migrationsLocation = TerminalHelper.getTerminalArgumentValue('ml');
    cliParameters.direction = TerminalHelper.getTerminalArgumentValue('d');
    cliParameters.dbc = {};
    cliParameters.dbc.host = TerminalHelper.getTerminalArgumentValue('h');
    cliParameters.dbc.user = TerminalHelper.getTerminalArgumentValue('u');
    cliParameters.dbc.password = TerminalHelper.getTerminalArgumentValue('p');
    cliParameters.dbc.db = TerminalHelper.getTerminalArgumentValue('db');

    MigrationsListService.getMigrations(cliParameters.migrationsLocation)
        .then((migrations) => {
            MigrationsRunService.runMigrations(migrations, cliParameters.direction, cliParameters.dbc);
        });

} else {
    console.log(
        Chalk.red.bold('[ERROR] ')
        + Chalk.red("The operation couldn't be detected. Try to use one of following: list or run")
    );
}
