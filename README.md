<<<<<<< HEAD
# Xomio project

This project was generated with [Gulp](https://www.npmjs.com/package/gulp/v/3.9.1) version 3.9.1.
Gulp v3.9.1 requires Node v11.15.0.

Uses [Twig](https://twig.symfony.com/doc/3.x/templates.html) for page templates.

A combination of modificated Bootstrap's grid system and utilities and [SCSS](https://sass-lang.com/) as CSS preprocessor were used.

manifest.json contains source and destination paths for gulp tasks.

SVG icon sprite (icons.svg) was generated from icons placed in src/svg-icons folder.

src/images/svg-font folder contains icons for icon font.
Icon font was generated with [Icomoon.io](https://icomoon.io/app)


## Development server

Run `gulp watch` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


## General structure

General structure for each project is like this:

```text
∇ build
    ∇ assets
        ∇ css
            app.css
            app.css.map
            vendor.css
            vendor.css.map
        ∇ fonts
            font-a.woff2
            font-b.woff2
        ∇ img
            icons.svg
            image-a.png
            image-b.svg
                ∇ svg-font
                    icon-a.svg
                    icon-b.svg
        ∇ js
            app.js
            vendor.js
        ∇ video
            video-a.mp4
            video-b.mp4
    index.html
    page-a.html
⊳ gulp-taks
∇ src
    ∇ fonts
        font-a.woff2
        font-b.woff2
    ∇ images
        image-a.png
        image-b.svg
            ∇ svg-font
                icon-a.svg
                icon-b.svg
    ∇ js
        script-a.js
        script-b.js
    ∇ scss
        ⊳ common
        ⊳ forms
        ⊳ layout
        ⊳ mixins
        ⊳ pages
        ⊳ sections
        ⊳ vendor
        ⊳ widgets
    ∇ svg-icons
        icon-a.svg
        icon-b.svg
    ∇ templates
        ∇ layout
            base.twig
            footer.twig
            header.twig
        ∇ macro
            icon.twig
        ∇ partials
            partial-a.twig
            partial-b.twig
        ∇ sections
            section-a.twig
            section-b.twig
        index.twig
        page-b.twig
        page-a.twig
    ∇ video
        video-a.mp4
        video-b.mp4
```
=======
# xomio
