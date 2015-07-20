import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './conf/webpack';

gulp.task('dev', done => {
    const server = new webpackDevServer(webpack(webpackConfig), {
        hot: true,
        stats: {
            colors: true,
            children: false,
            assets: false,
            version: false,
            hash: false,
            chunkModules: false
        }
    });

    server.listen('3000', 'localhost', err => {
        if (err) {
            throw new gutil.PluginError('dev', err);
        }

        done();
    });
});
