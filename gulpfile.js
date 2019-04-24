const {src, watch, dest, series, parallel} = require('gulp');
const pug = require('gulp-pug');

const paths = {
    pugs: './assets/pug/**/*.pug',

};

function pugTask(){
    return src(paths.pugs)
    .pipe(pug({
        pretty:true
    }))
    .pipe(dest('./static/views'));
}

function watchTask(){
    watch([paths.pugs],parallel(pugTask));
}

exports.default = series(
    watchTask
);