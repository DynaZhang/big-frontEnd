const path = require('path')
const { src, dest, watch, series } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const plugins = require('gulp-load-plugins')()

function js () {
  return src('js/*.js')
    .pipe(plugins.uglify())
    .pipe(dest(path.resolve(__dirname, 'dist/js')))
    .pipe(reload({stream: true}))
} 

function css () {
  return src('css/*.scss')
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer({cascade: false, remove: false}))
    .pipe(dest(path.resolve(__dirname, 'dist/css')))
    .pipe(reload({stream: true}))
}

function html () {
  return src('template/*.html')
    .pipe(plugins.htmlmin({
      collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值
        removeComments: true, //清除html注释
        removeEmptyAttributes: true, //删除所有空格做属性的值
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true,   //压缩页面JS
        minifyCSS: true    //压缩页面CSS
    }))
    .pipe(dest(path.resolve(__dirname, 'dist')))
    .pipe(reload({stream: true}))
}

function clean () {
  return del(path.resolve(__dirname, 'dist'))
}

function watcher(cb) {
  watch('js/*.js', js)
  watch('css/*.scss', css)
  watch('template/index.html', html)
  cb()
}

function serve (cb) {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  cb()
}

exports.html = html
exports.clean = clean
exports.scripts = js
exports.styles = css
exports.default = series([
  clean,
  js,
  css,
  html,
  serve,
  watcher
])
