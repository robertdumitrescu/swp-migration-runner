# SWP Migration Runner - Currently is WIP
## Overview
The purpose of this project is to help developers that are working on old projects or projects where an ORM is not suitable (integrations with Cloud databases or ESearch caching, etc) to be able to run and see the project migrations in an easy and understandable manner.

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


### Run migrations - Forward or Backwards

## Nice to haves - will be implemented in the future
- when displaying the migrations to check as well if the up.sql (or rollForward.sql) is present and to be displayed in a column as boolean
- when displaying the migrations to check as well if the down.sql (or rollBack.sql) is present and to be displayed in a column as boolean
- add support for the usual php projects migrations names (up.sql and down.sql)
- add support for breakpoints in time. For example if I want to roll forward with migrations till a point in time to be able to specify the name of the migration where to stop
- add automated tests to check name computing capabilities in list case



