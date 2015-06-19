var Service = require('node-mac').Service,
    path = require('path'),
    svc = new Service({
        name: 'MailWebSchedule',
        description: 'Send web pages by email on a schedule',
        script: "webmailer.js",
        wait: 2,
        grow: .5
    });

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    console.log('\nInstallation Complete\n---------------------');
    svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
    console.log('This service is already installed.');
    console.log('Attempting to start it.');
    svc.start();
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
    console.log(svc.name+' started!');
});

// Install the script as a service.
svc.install();