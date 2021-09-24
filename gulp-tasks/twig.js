'use strict';

let twig = require('gulp-twig'),
    fs = require('fs'),
    prettyHtml = require('gulp-pretty-html'),
    posthtml = require("gulp-posthtml"),
    phinclude = require("posthtml-include");

module.exports = function () {
    var data = this.opts.src.templates.data || {};
    return this.gulp.src(this.opts.src.templates.path + "/" + this.opts.argv.view)
        .pipe(twig({
            data: JSON.parse(fs.readFileSync(data)),
            functions: [
                {
                    name: 'assets',
                    func: function (url) {
                        return ((data.assets || '') + url).replace(/\/+/g, '/').replace(/^\//, '');
                    }
                }
            ],
        }))
        .pipe(prettyHtml())
        .pipe(posthtml([phinclude()]))
        .pipe(this.gulp.dest(this.opts.dist));
};

/*gulp.task("html", function() {
    return gulp.src("source/*.html")
        .pipe(rigger())
        .pipe(posthtml([
            phinclude()
        ]))
        .pipe(gulp.dest("dist/"));
});*/