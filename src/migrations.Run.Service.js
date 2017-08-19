'use strict';

const Lodash = require('lodash');

class MigrationsRunService {

    static sortChronologically(migrations) {
        return Lodash.orderBy(migrations, ['migrationDateTimestamp', 'attempt'], ['asc', 'asc']);
    }

}

module.exports = MigrationsRunService;