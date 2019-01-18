import minify from 'rollup-plugin-babel-minify';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	plugins: [ babel(), minify({ comments: false }) ],
	output: [
		{
			format: 'umd',
			name: 'EVENT_BUS',
			file: 'build/light-event-bus.min.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/light-event-bus.module.min.js',
			indent: '\t'
		}
	]
};