'use strict';

const Lodash = require('lodash');
const FileSystem = require('fs');
const Chalk = require('chalk');
const Client = require('mariasql');

const DatabaseConnectionBuilder = require('localpkg-sql-query-builder').DatabaseConnectionBuilder;
const SqlQueryExecuter = require('localpkg-sql-query-builder').SqlQueryExecuter;

class MigrationsRunService {

    /**
     * @param {Array} migrations
     * @param {String} direction
     * @param {Object} dbc
     * @param {String} dbc.host
     * @param {String} dbc.user
     * @param {String} dbc.password
     * @param {String} dbc.db
     */
    static async runMigrations(migrations, direction, dbc) {

        if(direction === 'backward'){
            migrations = migrations.reverse();
        }

        let errors = 0;

        /** mi stands for Migration Iterator*/
        for(let mi = 0; mi < migrations.length; mi++){
            let migration = MigrationsRunService.getSql(migrations[mi].path, direction);
            let databaseConnection = DatabaseConnectionBuilder.build(dbc);
            try {
                let queryResult = await SqlQueryExecuter.executeSqlQuery(migration, databaseConnection);
                console.log(Chalk.green.bold("[SUCCESS] ") + Chalk.green(migrations[mi].name + " migration ran successfully"));
                console.log(queryResult);
            } catch (error) {
                console.log(Chalk.red.bold("[ERROR] ") + Chalk.red(migrations[mi].name + " migration failed"));
                console.log(error);
                errors++;
            }
        }

        console.log(Chalk.blueBright.bold("Migrations: " + migrations.length + " Errors: " + errors));
    }

    /**
     * @param {String} migrationAbsolutePath
     * @param {String} direction
     * @returns {String}
     */
    static getSql(migrationAbsolutePath, direction) {

        let sql = "";

        if(direction === 'forward'){

            if(FileSystem.existsSync(migrationAbsolutePath + '/rollForward.sql')){
                sql = FileSystem.readFileSync(migrationAbsolutePath + '/rollForward.sql', 'utf8');
            } else if(FileSystem.existsSync(migrationAbsolutePath + '/up.sql')) {
                sql = FileSystem.readFileSync(migrationAbsolutePath + '/up.sql', 'utf8');
            } else {
                console.log(
                    Chalk.red.bold("[ERROR] ") + Chalk.red("Script not found for: " + migrationAbsolutePath)
                );
            }

        } else if(direction === 'backward'){

            if(FileSystem.existsSync(migrationAbsolutePath + '/rollBack.sql')){
                sql = FileSystem.readFileSync(migrationAbsolutePath + '/rollBack.sql', 'utf8');
            } else if(FileSystem.existsSync(migrationAbsolutePath + '/down.sql')) {
                sql = FileSystem.readFileSync(migrationAbsolutePath + '/down.sql', 'utf8');
            } else {
                console.log(
                    Chalk.red.bold("[ERROR] ") + Chalk.red("Script not found for: " + migrationAbsolutePath)
                );
            }
        }

        sql = sql.replace(new RegExp('\r','g'), ' ');
        sql = sql.replace(new RegExp('\n','g'), ' ');
        sql = sql.replace(new RegExp('\t','g'), ' ');
        return sql;
    }

}

module.exports = MigrationsRunService;