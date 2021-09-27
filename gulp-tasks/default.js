'use strict';

let sequence = require('gulp-sequence');


module.exports = function (cb) {

    return sequence(
        ['fonts', 'images', 'video', 'styles', 'scripts', 'twig', 'icons'],
        cb
    );
};
