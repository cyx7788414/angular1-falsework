function MyPlugin(options) {
this.options = options;
}

MyPlugin.prototype.apply = function(compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        	var forExpendFlag = htmlPluginData.plugin.options.forExpendFlag;
            for (var i = paths.length - 1; i >= 0; i--) {
            	var item = paths[i];
            	if (item.exclude) {
            		if (item.exclude.indexOf(forExpendFlag) === -1) {
            			htmlPluginData.assets.js.unshift(item.name);
            		}
            	} else if (item.include) {
            		if (item.include.indexOf(forExpendFlag) !== -1) {
            			htmlPluginData.assets.js.unshift(item.name);
            		}
            	} else {
            		htmlPluginData.assets.js.unshift(item.name);
            	}
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = MyPlugin;