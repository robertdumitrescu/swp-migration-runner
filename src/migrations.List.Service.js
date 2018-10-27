'use strict';

const Moment = require('moment');
const Lodash = require('lodash');
const Chalk = require('chalk');

const FilesHelper = require('localpkg-core').FilesHelper;

class MigrationsListService {

    /**
     * @param path
     * @returns {Promise.<Object>}
     */
    static async getMigrations(path) {

        let migrations = await FilesHelper.listFilesAndDetails(path);
        migrations = await MigrationsListService.computeNames(migrations);
        migrations = MigrationsListService.sortChronologically(migrations);

        return migrations;


    }

    /**
     * @param {Object[]} migrations
     * @returns {Promise.<Object>}
     */
    static async computeNames(migrations) {
        for (let mi = 0; mi < migrations.length; mi++) {

            let nameComponents = migrations[mi].name.split('_');
            let migrationDate = Moment(nameComponents[0], 'DD-MM-YYYY');

            migrations[mi].migrationDate = migrationDate.format('DD-MM-YYYY');
            migrations[mi].migrationDateTimestamp = migrationDate.unix();
            migrations[mi].attempt = parseInt(nameComponents[1]);
        }

        return migrations;
    }

    /**
     * @param {Object[]} migrations
     * @returns {Object[]}
     */
    static sortChronologically(migrations) {
        return Lodash.orderBy(migrations, ['migrationDateTimestamp', 'attempt'], ['asc', 'asc']);
    }

    /**
     * @param {Object[]} migrations
     * @returns {void}
     */
    static display(migrations) {
        console.log(
            Chalk.green.bold('|     Date     ')
            + Chalk.blueBright.bold('| Attempt ')
            + Chalk.white.bold('|        Name        ')
            + Chalk.magenta.bold('|     Permissions     ')
            + Chalk.yellow.bold('| Files count ')
            + Chalk.red.bold('|   Size   ')
        );

        for (let mi = 0; mi < migrations.length; mi++) {
            console.log(
                Chalk.green('|  ' + migrations[mi].migrationDate + '  ')
                + Chalk.blueBright('|    ' + migrations[mi].attempt + '    ')
                + Chalk.white('|   ' + migrations[mi].name + '   ')
                + Chalk.magenta('|     ' + migrations[mi].permission + '      ')
                + Chalk.yellow('|       ' + migrations[mi].filesCount + '     ')
                + Chalk.red('|  ' + migrations[mi].readableSize + ' ')
            );
        }
    }

}

module.exports = MigrationsListService;
