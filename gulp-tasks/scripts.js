'use strict';

let browser = require('browser-sync'),
    concat = require('gulp-concat'),
    sequence = require('gulp-sequence');


module.exports = function (cb) {

    let tasks = [];

    for (let filename in this.opts.src) {
        if (this.opts.src.hasOwnProperty(filename) && filename.split('.').pop() === 'js') {

            this.gulp.task(filename, function (gulp, src, dist) {
                gulp.src(src[filename].files)
                    .pipe(concat(filename))
                    .pipe(gulp.dest(dist + '/assets/js'))
                    .pipe(browser.stream({match: '**/*.js'}));
            }(this.gulp, this.opts.src, this.opts.dist));

            tasks.push(filename);
        }
    }

    return sequence(tasks, cb);
};
