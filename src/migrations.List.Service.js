'use strict';

const fileSystem = require('fs');
const util = require('util');
const q = require('q');

const GenericFilesHelper = require('localpkg-generic-helper').genericFilesHelper;

class MigrationsListService {

    static async getMigrations(path){

        let migrations = await GenericFilesHelper.listFiles(path, {});
        console.log(migrations);
        console.log(await GenericFilesHelper.getDirectoryMetaData(migrations[0]));
        console.log(await GenericFilesHelper.getFileMetaData(migrations[0]));
        console.log(await MigrationsListService.getFileStats(migrations[0]));
    }

    /**
     * @TODO To be moved in FileHelper
     */
    static getFileStats(path){
        let deferred = q.defer();
            fileSystem.stat(path, function (error, stats) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    static async computeMigrationsNames(){

    }

}

module.exports = MigrationsListService;