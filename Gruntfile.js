module.exports = function(grunt) {
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
    });

    grunt.loadNpmTasks('grunt-contrib-sass'); //cargar plug-in
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //definimos las tareas de grunt (las que se ejecutan con 'grunt [nombreDeTarea]')
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('images:compress', ['imagemin']);
    grunt.registerTask('default', ['browserSync', 'watch']); //tarea default (solo ejecutando 'grunt' a secas)
}