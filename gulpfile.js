const gulp = require('gulp');
const watch = require('gulp-watch');

// JS
const rollup = require('gulp-rollup');
const npm = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('gulp-sourcemaps');

// CSS
const stylus = require('gulp-stylus');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const rupture = require('rupture');

const paths = {
	'js': {
		main: './client/content/index.js',
		all: './client/**/**/*.js',
		output: './client/dist/js/'
	},
	'style': {
		main: './client/content/index.styl',
		all: './client/content/**/*.styl',
		output: './client/dist/css/'
	}
};

gulp.task('watch:css', function () {
	return gulp.watch(paths.style.all, ['css-dev']);
});

gulp.task('watch:js', function () {
	return gulp.watch(paths.js.all, ['js-dev']);
});

gulp.task('css-dev', function () {
	return gulp.src(paths.style.main)
		.pipe(stylus({
			'include css': true,
			'use': [rupture()]
		}))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('css', function() {
    return gulp.src(paths.style.main)
		.pipe(stylus({
			'include css': true,
			'use': [rupture()]
		}))
		.pipe(autoprefixer())
		.pipe(cssmin())
        .pipe(gulp.dest(paths.style.output));
});

gulp.task('js-dev', function() {
    return gulp.src(paths.js.main)
        .pipe(rollup({
			allowRealFiles: true,
			entry: paths.js.main,
            format: 'iife',
            sourceMap: true,
            plugins: [
                npm({
					jsnext: true,
					main: true
				}),
                babel({
					presets: ['es2015-rollup'],
                    babelrc: false,
					exclude: 'node_modules/**'
				}),
				common({
					include: 'node_modules/**'
				})
            ]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.js.output));
});

gulp.task('js', function() {
    return gulp.src(paths.js.main)
        .pipe(rollup({
			allowRealFiles: true,
			entry: paths.js.main,
            format: 'iife',
            plugins: [
                npm({
					jsnext: true,
					main: true
				}),
                babel({
					presets: ['es2015-rollup'],
                    babelrc: false,
					exclude: 'node_modules/**'
				}),
				common({
					include: 'node_modules/**'
				}),
				uglify()
            ]
        }))
        .pipe(gulp.dest(paths.js.output));
});

gulp.task('watch', ['watch:css', 'watch:js']);
gulp.task('build', ['css', 'js']);
gulp.task('dev', ['js-dev', 'css-dev', 'watch']);
