# SWP Migration Runner - Currently is WIP
## Overview
The purpose of this project is to help developers that are working on old projects or projects where an ORM is not suitable (integrations with Cloud databases or ESearch caching, etc) to be able to run and see the project migrations in an easy and understandable manner.

### What's this?
A easy way to run migrations and visualize migrations written manually.

### What is not:
A proof of coding skills. A project that I'm commited to maintain till I get old.

## CLI options
```
- o - Operation.
    -- list
    -- run
- ml - Migrations Location. Basically the path to the migrations directories
- d - Direction. The direction in which the migrations will be ran.
    -- forward
    -- backward
```
## Features

### List migrations

Using the following command syntax you can easily get all the migrations related to a project:

```
node index.js o=list ml=/home/robert/gitRepos/PROJECT/sql/migrations/*
```

And the output of that looks like this:

Migrations listing in JetBrains products
![migrations-listing-jetbrains](/statics/images/migrations-listing-jetbrains.png)

Migrations listing in Linux Terminator
![migrations-listing-terminator](/statics/images/migrations-listing-terminator.png)


### Run migrations - Forward or Backwards - @TODO

## Nice to haves - will be implemented in the future
- add cli parameters validation in order to have a consistent outcome
- when displaying the migrations to check as well if the up.sql (or rollForward.sql) is present and to be displayed in a column as boolean
- when displaying the migrations to check as well if the down.sql (or rollBack.sql) is present and to be displayed in a column as boolean
- add support for the usual php projects migrations names (up.sql and down.sql)
- add support for breakpoints in time. For example if I want to roll forward with migrations till a point in time to be able to specify the name of the migration where to stop
- add automated tests to check name computing capabilities in list case



