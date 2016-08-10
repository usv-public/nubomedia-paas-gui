var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var browser = require('browser-sync');
var compatibility = ['last 2 versions', 'ie >= 9'];
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var panini = require('panini');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var sherpa = require('style-sherpa');
var gutil = require('gulp-util');

var isGziped = !!(argv.gzip);
var isProduction = !!(argv.production);
var port = 8000;

var PATHS = {
  dist: 'dist',
  bootstrap_fonts: [
    'bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*'
  ],
  assets: [
    'src/assets/**/*',
    "!src/assets/{img,js,sass,img/**/,js/**/*,sass/**/*}"
  ],
  css: [],
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/bootstrap-sass/assets/stylesheets',
    'bower_components/motion-ui/src/'
  ],
  javascript: [
    'src/assets/js/**/*.js'
  ],
  javascriptVendors: [
    'bower_components/jquery2/dist/jquery.js',
    'bower_components/clipboard/dist/clipboard.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'node_modules/chart.js/dist/Chart.js'
  ]
};

// Delete the "dist" folder every time a build starts
gulp.task('clean', function(done) {
  rimraf(PATHS.dist, done);
});

// Copy files out of the assets folder
gulp.task('copy', function() {
  gulp
    .src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
});

// Copy Bootstrap fonts
gulp.task('bootstrapFonts', function() {
  gulp
    .src(PATHS.bootstrap_fonts)
    .pipe(gulp.dest(PATHS.dist + '/assets/fonts/bootstrap'));
});

// Compiles the sass files and appends the css files from vendors in one app.css file
gulp.task('stylesheets', function() {

  var minifycss = $.if(isProduction, $.minifyCss());

  var cssStream =
    gulp
    .src(PATHS.css)
    .pipe($.concat('css-styles.css'));

  var scssStream =
    gulp
    .src('src/assets/sass/app.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        includePaths: PATHS.sass
      })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: compatibility
    }))
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.concat('scss-styles.css'));

  var mergedStream =
    merge(cssStream, scssStream)
    .pipe($.concat('app.css'))
    .pipe($.if(isProduction && isGziped, $.gzip({})))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'));

  return mergedStream;
});

// Combine JavaScript
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function(e) {
      console.log(e);
    }));

  return gulp
    .src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});

// Combine the vendors JavaScript
gulp.task('javascriptVendors', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function(e) {
      console.log(e);
    }));

  return gulp
    .src(PATHS.javascriptVendors)
    .pipe($.concat('vendor.js'))
    .pipe(uglify)
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
});

// Copy images to the "dist" folder
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp
    .src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
});

// Use this only when prototyping
// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp
    .src('src/pages/**/*.{html,hbs,handlebars,jade}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('messages', ['server'], function() {
  if (!isProduction && !isGziped) {
    gutil.log(gutil.colors.yellow("DEVELOPMENT build was finished!"));
  } else if (isProduction && !isGziped) {
    gutil.log(gutil.colors.green("PRODUCTION build without GZIP was finished!"));
  } else if (isProduction && isGziped) {
    gutil.log(gutil.colors.green("PRODUCTION with GZIP build was finished!"));
  }
});

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});

// Build the "dist" folder
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'stylesheets', 'javascript', 'javascriptVendors', 'images', 'copy', 'bootstrapFonts'], done);
});

// Start a server with LiveReload
gulp.task('server', ['build'], function() {
  browser.init({
    server: PATHS.dist,
    files: [PATHS.dist + '/assets/css/**/*'],
    middleware: require("connect-gzip-static")(PATHS.dist),
    port: port
  });
});


// Build the "dist" folder by running all of the below tasks
gulp.task('default', ['build', 'server', 'messages'], function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['src/assets/sass/**/*.sass'], ['stylesheets', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);

  // Use only for prototyping
  gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
});
