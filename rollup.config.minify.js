import minify from 'rollup-plugin-babel-minify';
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	plugins: [ babel(), minify() ],
	output: [
		{
			format: 'umd',
			name: 'EVENTBUS',
			file: 'build/event-bus.min.js',
			indent: '\t'
		}
	]
};