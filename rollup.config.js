import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	plugins: [ babel() ],
	output: [
		{
			format: 'umd',
			name: 'EVENT_BUS',
			file: 'build/event-bus.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/event-bus.module.js',
			indent: '\t'
		}
	]
};