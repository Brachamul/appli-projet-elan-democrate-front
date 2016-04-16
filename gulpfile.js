var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');
	debug = require('gulp-debug');
	babel = require('gulp-babel');
	webpack = require('webpack-stream');
	watch = require('gulp-watch')
	sourcemaps = require('gulp-sourcemaps')

gulp.task('clean', function() {
	return del(['ressources/rawfiles/', 'ressources/prodfiles/']);
});

gulp.task('bundle', function() {
	return gulp.src('ressources/sourcefiles/index.js')
		.pipe(webpack({
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel', // 'babel-loader' is also a legal name to reference
						query: { presets: ['react', 'es2015', 'stage-2'], compact: false, },
					}
				],
			},			
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('ressources/rawfiles/')) // Output unminified bundle
		.pipe(notify({ message: 'Bundling complete!' }))
//		.pipe(uglify()).on('error', errorHandler) 
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('ressources/prodfiles/')) // Output minified bundle
});

gulp.task('styles', function() {
	return sass('ressources/sourcefiles/*.scss', { style: 'expanded' })
//		.pipe(debug({title: 'unicorn:'}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('ressources/rawfiles/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('ressources/prodfiles/'))
});

//	gulp.task('scripts', function() {
//		return gulp.src('ressources/rawfiles/bundle.js')
//	//		.pipe(jshint('.jshintrc'))
//	//		.pipe(jshint.reporter('default'))
//	//		.pipe(concat('main.js'))
//			.pipe(babel({presets: ['react', 'es2015', 'stage-2']})) // added stage-2 for babel-preset-stage-2 in order to use "..."" notation in react
//	//		.pipe(gulp.dest('ressources/rawfiles/'))
//			.pipe(rename({suffix: '.min'}))
//	//		.pipe(uglify()).on('error', errorHandler) 
//			.pipe(gulp.dest('ressources/prodfiles/'))
//	});	


gulp.task('default',
	gulp.series(
		'clean',
		gulp.parallel('bundle', 'styles')
	)
)

// Handle the error
function errorHandler (error) {
	console.log(error.toString());
	this.emit('end');
}