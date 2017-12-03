/**
 * Created by Кристи on 15.11.2017.
 */
/*первый подключаемый файл*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require("del"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefix = require('gulp-autoprefixer'),
    notify = require( 'gulp-notify' )
    ;

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        .pipe(sassImport({
            import: 'app/sass/app.scss'
        }))
});

/*препроцесинг сасс */
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')

        .pipe( sass().on('error', notify.onError(
            {
                message:"<%= error.message %>",
                title:"Sass Error"
            }  ))
    )
   .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade:true}))
   .pipe(gulp.dest('app/css'))
   .pipe(browserSync.reload({stream:true}))
});


gulp.task('browser-sync', function(){
    browserSync({ /*определеям параместры*/
        server:{
            baseDir:'app'
        },
        notify:false
    })
});

gulp.task('clean', function () {
   return del.sync('final');
});
/*очищаем img cache*/
gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function(){
   return gulp.src('app/img/**/*')
       .pipe(cache(imagemin({
          interlaced:true,
          progressive:true,
          svgoPlugins:[{removeViewBox:false}],
          une:[pngquant()]
       })))
        .pipe(gulp.dest('final/img'));
});



/*следим за изменениями в файлах watch*/
gulp.task('watch',['browser-sync', 'sass'],function(){
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);

});
/*готовим к продакшин сборка */
gulp.task('build',['clean','img', 'sass'], function(){
    var buildCss = gulp.src([
        'app/css/app.css'
    ])
        .pipe(gulp.dest('final/css'));

    var buildFonts = gulp.src([
        'app/fonts/**/*'
    ])
        .pipe(gulp.dest('final/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('final/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('final'));
});