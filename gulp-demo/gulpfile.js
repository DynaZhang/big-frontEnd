const {src, dest, series, watch} = require('gulp')
const del = require('del')
// gulp-uglify => plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

// 压缩js uglifyjs
function js () {
  return src('js/*.js')
    .pipe(plugins.uglify())  // 下一个处理环节
    .pipe(dest('./dist/js'))
}
// 对scss、less编译 压缩 输出css文件
function css() {
  return src('styles/*.scss')
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer({
      cascade: false,
      remove: false
    }))
    .pipe(dest('./dist/css'))
}
// 监听文件变化
function watcher (cb) {
  watch('js/*.js')
  console.log(1111);
  watch('styles/*.scss')
  cb()
}
// 删除dist文件中的内容
function clean (cb) {
  return del('./dist')
}

exports.scripts = js
exports.styles = css
exports.clean = clean
exports.default = series([
  clean,js,css,watcher
])
