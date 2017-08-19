'use strict';

const Moment = require('moment');
const Lodash = require('lodash');
const Chalk = require('chalk');

const GenericFilesHelper = require('localpkg-generic-helper').genericFilesHelper;

class MigrationsListService {

    static async getMigrations(path) {

        let migrations = await GenericFilesHelper.listFilesAndDetails(path);
        migrations = await MigrationsListService.computeNames(migrations);
        migrations = MigrationsListService.sortChronologically(migrations);
        MigrationsListService.display(migrations);
    }

    static async computeNames(migrations) {
        for (let mi = 0; mi < migrations.length; mi++) {

            let nameComponents = migrations[mi].name.split("_");
            let migrationDate = Moment(nameComponents[0], 'DD-MM-YYYY');

            migrations[mi].migrationDate = migrationDate.format('DD-MM-YYYY');
            migrations[mi].migrationDateTimestamp = migrationDate.unix();
            migrations[mi].attempt = parseInt(nameComponents[1]);
        }

        return migrations;
    }

    static sortChronologically(migrations) {
        return Lodash.orderBy(migrations, ['migrationDateTimestamp', 'attempt'], ['asc', 'asc']);
    }

    static display(migrations) {
        console.log(
            Chalk.green("|     Date     ") +
            Chalk.blueBright("| Attempt ") +
            Chalk.white("|        Name        ") +
            Chalk.magenta("|     Permissions     ") +
            Chalk.yellow("| Files count ") +
            Chalk.red("|   Size   ")
        );

        for (let mi = 0; mi < migrations.length; mi++) {
            console.log(
                Chalk.green('|  ' + migrations[mi].migrationDate + '  ') +
                Chalk.blueBright('|    ' + migrations[mi].attempt + '    ') +
                Chalk.white('|   ' + migrations[mi].name + '   ') +
                Chalk.magenta('|     ' + migrations[mi].permission + '      ') +
                Chalk.yellow('|       ' + migrations[mi].filesCount + '     ') +
                Chalk.red('|  ' + migrations[mi].readableSize + ' ')
            );
        }
    }

}

module.exports = MigrationsListService;