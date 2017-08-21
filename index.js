"use strict";

const FileSystem = require('fs');
const Chalk = require('chalk');

/** localpkg packages */
const GenericTerminalHelper = require('localpkg-generic-helper').genericTerminalHelper;

/** Service */
const MigrationsListService = require('./src/migrations.List.Service');
const MigrationsRunService = require('./src/migrations.Run.Service');


const operation = GenericTerminalHelper.getTerminalArgumentValue("o");


if(operation === "list"){

    const migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue("ml");

    MigrationsListService.getMigrations(migrationsLocation)
        .then(function (migrations) {
            migrations = MigrationsListService.sortChronologically(migrations);
            MigrationsListService.display(migrations);
        });

} else if (operation === "run") {

    const migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue("ml");
    const direction = GenericTerminalHelper.getTerminalArgumentValue("d");

    MigrationsListService.getMigrations(migrationsLocation)
        .then(function (migrations) {
            MigrationsRunService.runMigrations(migrations, direction)
        });

} else {
    console.log(
        Chalk.red.bold("[ERROR] ") +
        Chalk.red("The operation couldn't be detected. Try to use one of following: list or run"));
}