import Markfive from 'markfive';

export default function(eleventyConfig) {
	// Set global permalinks to resource.html style
	eleventyConfig.addGlobalData('permalink', () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});
	// Remove .html from `page.url`
	eleventyConfig.addUrlTransform((page) => {
		if (page.url.endsWith('.html')) {
			return page.url.slice(0, -1 * '.html'.length);
		}
	});

	eleventyConfig.addTemplateFormats('mf');
	eleventyConfig.addExtension('mf', {
		compile: async function (inputContent) {
			return async (data) => {
				const markfive = new Markfive(inputContent, {}, data);
				return markfive.run();
			};
		},
	});

	eleventyConfig.addPassthroughCopy({'content/styles': 'styles'});
	eleventyConfig.addPassthroughCopy({'content/scripts': 'scripts'});
	eleventyConfig.addPassthroughCopy({'node_modules/markfive/lib/markfive.css': 'styles/markfive.css'});
	eleventyConfig.addPassthroughCopy({'node_modules/@picocss/pico/css/pico.indigo.min.css': 'styles/pico.min.css'});
	eleventyConfig.addPassthroughCopy({'node_modules/feather-icons/dist/feather.min.js': 'js/feather.min.js'});
};

export const config = {
	dir: {
		input: 'content',         // default: "."
		includes: '../includes',  // default: "_includes" (`input` relative)
		data: '../data',          // default: "_data" (`input` relative)
		output: 'site',
	},
};
