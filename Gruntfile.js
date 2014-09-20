module.exports = function(grunt){
	grunt.initConfig({
	uglify : {
		options : {
			banner :'/*! Adventurer <%= grunt.template.today("dd-mm-yyyy") %> */\n',
			compress : {
				drop_console:true,
			},
			mangle : true
		},
		dist : {
			files : {
				'build/Adventurer.js' : ['Adventurer.js']
			}
		}
	}
	
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);	
}
