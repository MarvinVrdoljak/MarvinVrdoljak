var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    importCss = require('gulp-import-css');


var themifyOptions = {
    palette: {
        light: {
            'primary-100': '#f2f2f4',
            'primary-200': '#cccece',
            'accent-100': '#e6f9fc',
            'accent-200': '#96e1ed'
        },
        dark: {
            'primary-100': '#505050',
            'primary-200': '#666a6b',
            'accent-100': '#096796',
            'accent-200': '#0a87c6'
        }
    },
    screwIE11: false,
    fallback: {
        cssPath: './dist/theme_fallback.css',
        dynamicPath: './dist/theme_fallback.json'
    }
};

var paths = {
    styles: {
        src: "./src/assets/scss/**/*.scss",
        dest: "./dist/css"
    },
    scripts: {
        src: "./config/js.json",
        dest: "./dist/js"
    },
    images: {
        src: "./src/assets/images/**/*",
        dest: "./dist/images"
    }
};

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(importCss())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
    );
}

function styleMinified() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(importCss())
            .pipe(postcss([autoprefixer(
                {
                    browsers: ['last 2 versions', 'Safari >= 8', 'ie >= 10', 'ios >= 7'],
                    cascade: false
                }
            ), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
    );
}

function scripts() {
    return (
        gulp.src(require(paths.scripts.src))
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(gulp.dest(paths.scripts.dest))
    );
}

function scriptsMinified() {
    return (
        gulp.src(require(paths.scripts.src))
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(paths.scripts.dest))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dest))
    );
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}


function watch() {
    gulp.watch(paths.styles.src, style)
}

function watchjs() {
    gulp.watch('./src/assets/js/**/*.js', scripts)
}


gulp.task("default", gulp.parallel(watch, watchjs));
gulp.task("watch", gulp.parallel(watch));
gulp.task("build", gulp.parallel(styleMinified, scriptsMinified, images));