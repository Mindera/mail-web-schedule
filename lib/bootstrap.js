/*jshint node:true, laxcomma:true */

var config = require('./config'),
    logger = require('./logger'),
    executor = require('./executor'),
    CronJob = require('cron').CronJob,
    l,
    jobs = [];

module.exports = {

    run: function (config) {


        l = logger.init(config, module);

        l.info("Configuration (re)loaded. Rebuilding jobs");

        // stop all previous registered jobs
        jobs.forEach(function (job) {
            job.stop();
        });

        jobs = [];

        // creates a new cronjob
        config.jobs.forEach(function (job_config) {
            var job = new CronJob(
                job_config.cron,
                executor.run(config, job_config),
                executor.stop(config, job_config),
                true,
                config.timezone
            );

            jobs.push(job);
        });
    }
};