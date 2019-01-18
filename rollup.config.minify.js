import minify from 'rollup-plugin-babel-minify';

export default {
	input: 'src/index.js',
	plugins: [ minify() ],
	output: [
		{
			format: 'umd',
			name: 'EVENTBUS',
			file: 'build/event-bus.min.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/event-bus.module.min.js',
			indent: '\t'
		}
	]
};