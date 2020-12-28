'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function(done) {
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
        // console.log("archivos sass convertidos a css");
        done();
});

gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss', ['sass']);
    });

gulp.task('browser-sync', function(done) {
    var files = ['./*.html', './css/*.css', './images/*.{png, jpg, gif}','./images/masters/*.{png, jpg, gif}','./images/servants/*.{png, jpg, gif}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: './'
        }   
    });
    done();
});

gulp.task('default', ['browser-sync'], function() {
    gulp.start('sass:watch');
    });
