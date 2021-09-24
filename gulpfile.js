'use strict';

let manifest = require('./manifest.json'),
    argv = require('yargs')
        .string('view').default('view', manifest.src.templates.default)
        .argv;


require('gulp-task-loader')({
    argv: argv,
    src: manifest.src,
    dist: manifest.dist,
    watch: manifest.watch
});
