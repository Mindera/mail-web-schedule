var phantom = require('phantom'),
    address, output, size;

module.exports = {

    rasterize: function rasterize(logger, address, filename, paperSize, callback) {

        phantom.create(function (ph) {
            ph.createPage(function (page) {

                page.set("paperSize", paperSize);

                page.open(address, function (status) {

                    if (status !== 'success') {
                        logger.error('Unable to load the address: ' + address);
                        ph.exit();
                        callback(false);
                    } else {
                        //page.render('google_home.pdf', {format: 'pdf', quality: '100'});
                        page.render(filename, function () {
                            logger.info('Created [' + filename + '] for address:' + address);
                            ph.exit();
                            callback(filename);
                        });
                    }
                });
            });
        });
    }
};
