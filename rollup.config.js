export default {
	input: 'src/index.js',
	output: [
		{
			format: 'umd',
			name: 'EVENTBUS',
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