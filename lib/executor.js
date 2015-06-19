var logger = require('./logger'),
    rasterize = require('./rasterize').rasterize,
    nodemailer = require("nodemailer"),
    fs = require('fs'),
    os = require('os'),
    path = require("path");


module.exports = {
    run: function (config, job_config) {

        var l = logger.init(config, module),
            transporter = nodemailer.createTransport(job_config.transport),
            temp_dir = os.tmpdir();


        return function run() {
            l.info('Running job [' + job_config.subject + ']: ' + job_config.page.url);

            var filename = job_config.subject.replace(/\s/g, '_') + '.pdf';
            rasterize(l, job_config.page, path.resolve(temp_dir, filename), job_config.paperSize, function (file) {

                var mailOptions;

                if (file) {


                    // setup e-mail data
                    mailOptions = {
                        from: job_config.from.name + '<' + job_config.from.email + '>',
                        to: job_config.to.join(","),
                        cc: job_config.cc.join(","),
                        subject: job_config.subject,
                        text: job_config.body,
                        html: job_config.bodyHtml,
                        attachments: [
                            {
                                filename: filename,
                                path: file
                            }]
                    };

                    // send mail
                    transporter.sendMail(mailOptions, function (error, response) {
                        fs.unlinkSync(file);
                        if (error) {
                            l.error('Failed to send email: ' + job_config.subject);
                        } else {
                            l.info('Email sent: ' + job_config.subject);
                        }
                    });
                }
            });
        };
    },

    stop: function (config, job_config) {

        var l = logger.init(config, module);

        return function stop() {
            l.info('stopping job: ' + job_config.subject);
        };
    }
};