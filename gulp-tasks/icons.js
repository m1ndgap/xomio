"use strict";

const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const merge = require('merge');
const path = require('path');

// Gulp task for rendering SVG icon sprites
module.exports = function (name, cfg) {
    const config = Object.assign({
        src: 'src/svg-icons/*.svg',
        dest: this.opts.dist + '/assets/img',
        config: null,
        colors: true,  // Set to true to preserve colors into icons
        size: 24,
    }, cfg || {});

    let svgoPlugins = [
        {removeXMLNS: true},
        {removeRasterImages: true},
    ];
    if (!config.colors) {
        // Let SVGO to remove colors from icons
        svgoPlugins.push({
            removeAttributesBySelector: {
                selectors: [
                    {
                        selector: 'path',
                        attributes: ['fill', 'stroke'],
                    },
                ],
            },
        });
    }

    // noinspection JSUnusedGlobalSymbols
    let svgConfig = merge.recursive({
        shape: {
            id: {
                generator: (filename, file) => {
                    const id = path.basename(filename, path.extname(filename)).replace(/[^a-z0-9]+/gi, '-');
                    //const prefix = path.basename(file.base).replace(/s$/, '');
                    return `svg-icon-${id}`.toLowerCase();
                },
            },
            transform: [
                {
                    svgo: {
                        plugins: svgoPlugins,
                    },
                },
                {
                    custom:
                        function (shape, sprite, callback) {
                            // Convert main tag of SVG icon to <symbol> to allow outer CSS styles to be propagated to icon
                            const de = shape.dom.documentElement;
                            de.tagName = 'symbol';
                            de.removeAttribute('fill');
                            callback(null);
                        },
                },
            ],
        },
        svg: {
            rootAttributes: {
                'aria-hidden': 'true',
                'xmlns': 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                'version': '1.1',
            },
        },
        mode: {
            defs: {
                inline: true,
                example: false,
            },
        },
    }, config.config || {});

    if (config.size) {
        svgConfig = merge.recursive(svgConfig, {
            shape: {
                dimension: {
                    maxWidth: config.size,
                    maxHeight: config.size,
                },
            },
        });
    }

    return this.gulp.src(config.src, {allowEmpty: true})
        .pipe(svgSprite(svgConfig))
        .pipe(rename({dirname: '', basename: 'icons'}))
        .pipe(this.gulp.dest(config.dest));
};
