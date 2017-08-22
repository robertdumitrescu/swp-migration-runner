# SWP Migration Runner - Currently is WIP
## Overview
The purpose of this project is to help developers that are working on old projects or projects where an ORM is not suitable (integrations with Cloud databases or ESearch caching, etc) to be able to run and see the project migrations in an easy and understandable manner.

### What's this?
A easy way to run migrations and visualize migrations written manually.

### What is not:
A proof of coding skills. A project that I'm commited to maintain till I get old.

### Tested on:

| Operating System | Mysql version | Node version  |
| ---------------- |:-------------:| -------------:|
| Windows 10       | 5.6           | 6.9.0 LTS     |
| Windows 10       | 5.7.19-0      | 8.3.0         |
| Ubuntu 14.04     | 5.6           | 4.6.0 LTS     |
| Ubuntu 16.04     | 5.6           | 8.1.0         |
| Ubuntu 17.04     | 5.7.19-0      | 8.4.0         |

## CLI options
```
- o - Operation.
    -- list
    -- run
- ml - Migrations Location. Basically the path to the migrations directories
- d - Direction. The direction in which the migrations will be ran.
    -- forward
    -- backward
- h - Host. The database host
- u - User. The database user
- p - Password. The database user password
- db - Database. The database against the migrations will be ran
```
## Features

### List migrations

Using the following command syntax you can easily get all the migrations related to a project:

```
node index.js o=OPERATION ml=MIGRATIONS_LOCATION
```

Example: 

```
node index.js o=list ml=/home/robert/gitRepos/PROJECT/sql/migrations/*
```

The above example will list all migrations in `/home/robert/gitRepos/PROJECT/sql/migrations/*`

#### And the output of that looks like this:

Migrations listing in JetBrains products
![migrations-listing-jetbrains](/statics/images/migrations-listing-jetbrains.png)

Migrations listing in Linux Terminator
![migrations-listing-terminator](/statics/images/migrations-listing-terminator.png)


### Run migrations - Forward or Backwards - @TODO

In order to run the migrations in any direction, you need to run the following command: 
```
node index.js o=OPERATION ml=MIGRATIONS_LOCATION direction=DIRECTION h=HOST u=USER p=PASSWORD db=DATABASE
```

Example:

```
node index.js o=run ml=/home/robert/gitRepos/PROJECT/sql/migrations/* direction=forward h=127.0.0.1 u=robert p=123456 db=randomDatabase
```

The above example will `run` all migrations in `/home/robert/gitRepos/PROJECT/sql/migrations/*` in `forward` direction (from the oldest migration to the newest migration) for the dbc connection based on `host`, `user`, `password` and `database` credentials

#### And the output of that looks like this:

Migrations run in JetBrains products
![migrations-listing-jetbrains](/statics/images/migrations-run-jetbrains.png)

Migrations run in Linux Terminator
![migrations-listing-terminator](/statics/images/migrations-run-terminator.png)

Migrations run with errors in Linux Terminator
![migrations-listing-terminator](/statics/images/migrations-run-with-errors-terminator.png)


## Nice to haves - will be implemented in the future
- add cli parameters validation in order to have a consistent outcome
- when displaying the migrations to check as well if the up.sql (or rollForward.sql) is present and to be displayed in a column as boolean
- when displaying the migrations to check as well if the down.sql (or rollBack.sql) is present and to be displayed in a column as boolean
- ~~add support for the usual php projects migrations names (up.sql and down.sql)~~  [IMPLEMENTED]
- add support for breakpoints in time. For example if I want to roll forward with migrations till a point in time to be able to specify the name of the migration where to stop
- add automated tests to check name computing capabilities in list case
- add support for dbc config file for secure login
