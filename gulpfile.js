const { notify } = require('browser-sync');


let project_folder = "dist";
let source_folder = "#src"; // папка с исходниками

let fs = require('fs');

// folder path
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.sass",
        cssElems: source_folder + "/scss/**/*.sass",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
        convertedFonts: source_folder + "/fonts/converted/",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.sass",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require("gulp-group-css-media-queries"), // группировка медиазапросов в конец файла
    clean_css = require("gulp-clean-css"), // сжатие css
    rename = require("gulp-rename"), 
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"), // конвертация в webp
    webpcss = require("gulp-webpcss"),
    webphtml = require("gulp-webp-html"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');
    
    


// start local server
function browserSync(params){
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

//html
function html() {
    return src(path.src.html)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

// css 
function css(){
    return src(path.src.css)
    .pipe(sass({
        outputStyle: "expanded"
    }))
    .pipe(group_media())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
    }))
    .pipe(webpcss({}))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
        rename({
            extname: ".min.css"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}
function cssElems(){
    return src(path.src.cssElems)
    .pipe(sass({
        outputStyle: "expanded"
    }))
    // .pipe(group_media())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
    }))
    .pipe(webpcss({}))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
        rename({
            extname: ".min.css"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
    
}

// js
function js() {
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
        uglify()
    )
    .pipe(
        rename({
            extname: ".min.js"
        })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

// img
function images() {
    return src(path.src.img)
    .pipe(
        imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3 
        })
    )
    .pipe(dest(path.build.img))
    .pipe(
        webp({        
            quality: 70
        })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

//fonts convert ttf to woff and woff2
/* function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
} */
function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.src.convertedFonts));
    src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.src.convertedFonts));
    src(path.src.convertedFonts+'/*')
        .pipe(dest(path.build.fonts));
    return src(source_folder+'/fonts/icons/*')
        .pipe(dest(path.build.fonts + "/icons/"));
}

// convert otf to ttf
gulp.task('otf2ttf', function(){
    return gulp.src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));
})


//создает миксин для подключения шрифтов


function copyCss(){
    gulp.src(source_folder + '/js/lazysizes.min.js')
    .pipe(dest(path.build.js));

    return gulp.src(source_folder +'/css/**/*.css')
        .pipe(dest(path.build.css));
}

function copyLibs(){
    return gulp.src(source_folder+'/libs/**/*.*')
        .pipe(dest(project_folder + '/libs/'))
}


function cb(){}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

// delete project folder
function clean(){
    return del([path.clean, path.src.fonts + '/converted/']);
}

// let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), fontsStyle);
// let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, copyCss));
let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, copyCss, copyLibs));
let watch = gulp.parallel(build, watchFiles, browserSync);
// let itemsCss = gulp.cssElems;



// exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.copyCss = copyCss;
exports.copyLibs = copyLibs;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.cssElems = cssElems;
exports.default = watch;

