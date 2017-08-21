'use strict';

const Lodash = require('lodash');
const FileSystem = require('fs');

class MigrationsRunService {

    static runMigrations(migrations, direction) {

        /** mi stands for Migration Iterator*/
        for(let mi = 0; mi < migrations.length; mi++){
            MigrationsRunService.getSql(migrations[mi].path, direction)
        }
    }

    /**
     * @param {String} migrationAbsolutePath
     * @param {String} direction
     * @returns {Array}
     */
    static getSql(migrationAbsolutePath, direction) {

        let sql = "";

        if(direction === 'forward'){
            if(FileSystem.existsSync(migrationAbsolutePath + '/rollForward.sql')){
                sql = fs.readFileSync(migrationAbsolutePath + '/rollForward.sql');
            } else if(FileSystem.existsSync(migrationAbsolutePath + '/up.sql')) {
                sql = fs.readFileSync(migrationAbsolutePath + '/up.sql');
            }
        } else if(direction === 'backward'){
            if(FileSystem.existsSync(migrationAbsolutePath + '/rollBack.sql')){
                sql = fs.readFileSync(migrationAbsolutePath + '/rollBack.sql');
            } else if(FileSystem.existsSync(migrationAbsolutePath + '/down.sql')) {
                sql = fs.readFileSync(migrationAbsolutePath + '/down.sql');
            }
        }

        console.log(sql);
    }

}

module.exports = MigrationsRunService;