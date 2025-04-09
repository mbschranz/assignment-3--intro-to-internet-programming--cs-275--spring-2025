const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-clean-css`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let validateJS = () => {
    return src(`scripts/main.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let validateCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [{
                formatter: `string`,
                console: true
            }]
        }));
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `./`,
                `temp`
            ]
        }
    });

    watch(`scripts/main.js`, series(jsLinter, transpileJSForDev))
        .on(`change`, reload);

    watch(`styles/main.css`, compressCSS)
        .on(`change`, reload);

    watch(`index.html`, validateHTML)
        .on(`change`, reload);
};

//no need for the copyUnprocessedAssetsForProd task, as there are no outside assets.
//all assets (java script, css, html) are processed already.

exports.default = serve;    //the defualt IS serve, but there might as well be an explicit serve task.
exports.serve = serve;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);
