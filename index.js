"use strict";

const fileSystem = require('fs');
const Chalk = require('chalk');

const MigrationsListService = require('./src/migrations.List.Service');
const GenericTerminalHelper = require('localpkg-generic-helper').genericTerminalHelper;

const operation = GenericTerminalHelper.getTerminalArgumentValue("o");


if(operation === "list"){

    const migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue("ml");

    MigrationsListService.getMigrations(migrationsLocation)
        .then(function (migrations) {
            migrations = MigrationsListService.sortChronologically(migrations);
            MigrationsListService.display(migrations);
        });

} else if (operation === "run") {


} else {
    console.log(
        Chalk.red.bold("[ERROR] ") +
        Chalk.red("The operation couldn't be detected. Try to use one of following: list or run"));
}