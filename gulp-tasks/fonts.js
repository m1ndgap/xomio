'use strict';

let ttf2woff = require('gulp-ttf2woff');


module.exports = function () {

    return this.gulp.src(this.opts.src.fonts.files)
        .pipe(ttf2woff())
        .pipe(this.gulp.dest(this.opts.dist + '/assets/fonts'));
};
