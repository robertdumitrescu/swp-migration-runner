"use strict";

const fileSystem = require('fs');

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

}

// console.log(operation);
// console.log(direction);
// console.log(migrationsLocation);
// console.log(migrationsLocationPresent);