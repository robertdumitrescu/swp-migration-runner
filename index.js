'use strict';

const FileSystem = require('fs');
const Chalk = require('chalk');

/** localpkg packages */
const GenericTerminalHelper = require('localpkg-generic-helper').GenericTerminalHelper;

/** Service */
const MigrationsListService = require('./src/migrations.List.Service');
const MigrationsRunService = require('./src/migrations.Run.Service');


const operation = GenericTerminalHelper.getTerminalArgumentValue('o');


if (operation === 'list') {

    const migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue('ml');

    MigrationsListService.getMigrations(migrationsLocation)
        .then((migrations) => {
            migrations = MigrationsListService.sortChronologically(migrations);
            MigrationsListService.display(migrations);
        });

} else if (operation === 'run') {

    let cliParameters = {};
    cliParameters.migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue('ml');
    cliParameters.direction = GenericTerminalHelper.getTerminalArgumentValue('d');
    cliParameters.dbc = {};
    cliParameters.dbc.host = GenericTerminalHelper.getTerminalArgumentValue('h');
    cliParameters.dbc.user = GenericTerminalHelper.getTerminalArgumentValue('u');
    cliParameters.dbc.password = GenericTerminalHelper.getTerminalArgumentValue('p');
    cliParameters.dbc.db = GenericTerminalHelper.getTerminalArgumentValue('db');

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
