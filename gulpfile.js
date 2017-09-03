var gulp         = require('gulp');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');

var handleError = function(error) {
    console.log(error.toString());
    this.emit('end');
}

 gulp.task('serve', function(){
    browserSync.init({
        server: "./",
        notify: false
    })
}); 

gulp.task('sass',function(){
    return gulp.src('src/scss/main.scss')
    .pipe(plumber({
        errorHandler: handleError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest("css"))
    .pipe(autoprefixer({
        browsers: [">1%"]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('watch', function(){
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default',function(){
   console.log("----------------")
   gulp.start(['serve', 'sass', 'watch']);
});