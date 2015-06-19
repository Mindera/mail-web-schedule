/*jshint node:true, laxcomma:true */

var config = require('./lib/config'),
    bootstrap = require('./lib/bootstrap');

/**
 * Reads the config file and executes a callback whenever the config file is changed
 */
config.configFile(process.argv[2], function (config) {
    bootstrap.run(config);
});
