var path = require('path'),
    Service = require('node-mac').Service,
    svc = new Service({
        name: 'MailWebSchedule',
        script: "webmailer.js"
    });

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();