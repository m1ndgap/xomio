'use strict';

let sequence = require('gulp-sequence');


module.exports = function (cb) {

    return sequence(
        ['fonts', 'images', 'styles', 'scripts', 'twig', 'icons'],
        cb
    );
};
