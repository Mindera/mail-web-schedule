var phantom = require('phantom'),
    path = require('path');

module.exports = {

    rasterize: function rasterize(logger, target, filename, paperSize, callback) {

        var options = {
            path: path.resolve(__dirname, '../node_modules/phantomjs/lib/phantom/bin') + "/"
        };

        phantom.create(function (ph) {


            ph.createPage(function (page) {

                page.set("paperSize", paperSize);

                page.open(target.url, target.method, target.data, function (status) {

                    if (status !== 'success') {
                        logger.error('Unable to load the address: ' + target.url);
                        ph.exit();
                        callback(false);
                    } else {
                        //page.render('google_home.pdf', {format: 'pdf', quality: '100'});
                        page.render(filename, function () {
                            logger.info('Created [' + filename + '] for address:' + target.url);
                            ph.exit();
                            callback(filename, page.content);
                        });
                    }
                });
            });
        }, options);
    }
};
