'use strict';

let base64 = require('gulp-base64-inline'),
    browser = require('browser-sync'),
    concat = require('gulp-concat'),
    sequence = require('gulp-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano');


module.exports = function (cb) {

    let tasks = [];

    for (let filename in this.opts.src) {
        if (this.opts.src.hasOwnProperty(filename) && filename.split('.').pop() === 'css') {

            this.gulp.task(filename, function (gulp, src, dist) {
                gulp.src(src[filename].files)
                    .pipe(sourcemaps.init())
                    .pipe(sass({
                        importer: require("node-sass-importer"),
                        importerOptions: {
                            roots: ['src/scss', 'scss', 'node_modules'],
                            paths: ['node.{url}.scss', '{url}/sass', 'scss-{url}'],
                            fileExtensions: ['.css'],
                        }
                    }).on('error', sass.logError))
                    .pipe(concat(filename))
                    .pipe(cssnano({autoprefixer: false, zindex: false }))
                    .pipe(autoprefixer({
                        add: true
                    }))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(dist + '/assets/css'))
                    .pipe(browser.stream({match: '**/*.css'}));
            }(this.gulp, this.opts.src, this.opts.dist));

            tasks.push(filename);
        }
    }

    return sequence(tasks, cb);
};