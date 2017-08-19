"use strict";

const fileSystem = require('fs');

const MigrationsListService = require('./src/migrations.List.Service');
const GenericTerminalHelper = require('localpkg-generic-helper').genericTerminalHelper;

const operation = GenericTerminalHelper.getTerminalArgumentValue("o");


if(operation === "list"){

    const migrationsLocation = GenericTerminalHelper.getTerminalArgumentValue("ml");
    const migrationsLocationPresent = fileSystem.existsSync(migrationsLocation);

    // if(!migrationsLocationPresent){
    //     throw Error("The migrations location doesn't exist or the script doesn't have access to it");
    // }

    MigrationsListService.getMigrations(migrationsLocation);

}

// console.log(operation);
// console.log(direction);
// console.log(migrationsLocation);
// console.log(migrationsLocationPresent);