var stringUtils = require('ember-cli-string-utils');
var pathUtils   = require('ember-cli-path-utils');

module.exports = {
  locals: function(options) {
    var projectRoot       = stringUtils.dasherize(options.project.name());
    var pageObjectsFolder = '/tests/page-object';

    if (options.project.isEmberCLIAddon()) {
      projectRoot = 'dummy';
    }

    pageObjectsRoot = projectRoot + pageObjectsFolder;

    return {
      pageObjectsRoot: pageObjectsRoot
    };
	}
}
