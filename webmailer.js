/*jshint node:true, laxcomma:true */

var config = require('./lib/config'),
    bootstrap = require('./lib/bootstrap'),
    path = require("path");

process.chdir(__dirname);

/**
 * Reads the config file and executes a callback whenever the config file is changed
 */
config.configFile(process.argv[2] ? process.argv[2] : path.resolve(__dirname, "config.js"), function (config) {
    bootstrap.run(config);
});
