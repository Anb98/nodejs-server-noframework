const {src, watch, dest, series, parallel} = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');

const paths = {
    pugs: './assets/pug/**/*.pug',
    stylus: './assets/stylus/**/*.styl',
};

function pugTask(){
    return src(paths.pugs)
    .pipe(pug({
        pretty:true
    }))
    .pipe(dest('./static/views'));
}

function stylusTask(){
    return src(paths.stylus)
    .pipe(stylus())
    .pipe(dest('./static/css'));
}

function watchTask(){
    watch([paths.pugs, paths.stylus],parallel(pugTask, stylusTask));
}

exports.default = series(watchTask);