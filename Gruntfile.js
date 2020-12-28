module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',         //carpeta origen 
                    src: ['*.scss'],    //origen: todos los .scss 
                    dest: 'css',        //carpeta destino
                    ext: '.css'         //extension
                }]
            }
        },
        watch: {
            files: ['css/*.scss'],      //mirar cambios en
            tasks: ['sass']             //la tarea de grunt que se ejecuta
        },
        browserSync: {
            dev: {
                bsFiles: {              //browser files
                    src: [              //archivos que tiene que mirar
                        'css/*.css',
                        '*.html',
                        'js/*.js']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'   //Directorio base para nuestro servidor
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './images/',
                    src: './*.{png,gif,jpg,jpeg}',
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: './images/',
                    src: './servants/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: './images/',
                    src: './masters/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/images/'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './', //current working directory
                    src: ['*.html'],
                    dest: 'dist'
                }]
                
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font', //current working directory
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
                
            },
        },
        clean: {
            build: {
                src: ['dist/'] //clean the distribution folder
            }
        },
        cssmin: {
            dist: {}
            },
        uglify: {
            dist: {}
            },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 15
            },
            files: {
                src: ['dist/css/*.css', 'dist/js/*.js']
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                    src: ['index.html', 'about.html', 'contact.html', 'params.html']
                },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/contact.html', 'dist/params.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-sass'); //cargar plug-in (con jit-grunt ya no hace falta)
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-usemin');
    // grunt.loadNpmTasks('grunt-filerev');

    //definimos las tareas de grunt (las que se ejecutan con 'grunt [nombreDeTarea]')
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('images:compress', ['imagemin']);
    grunt.registerTask('default', ['browserSync', 'watch']); //tarea default (solo ejecutando 'grunt' a secas)
    grunt.registerTask('build', [
        'clean', //Borramos el contenido de dist
        'copy', //Copiamos los archivos html a dist
        'imagemin', //Optimizamos imagenes y las copiamos a dist
        'useminPrepare', //Preparamos la configuracion de usemin
        'concat',
        'cssmin',
        'uglify',
        'filerev', //Agregamos cadena aleatoria
        'usemin' //Reemplazamos las referencias por los archivos generados por filerev
        ]);
}