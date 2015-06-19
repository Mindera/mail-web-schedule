(function () {

    var transport = {
            'service': 'Gmail',
            'auth': {
                'user': 'username',
                'pass': 'password'
            }
        },
        paperSize = {
            'format': 'A4',
            'margin': '1cm',
            'orientation': 'portrait'
        },
        winston = {
            'silent': false,
            'level': 'info',
            'colorize': false,
            'timestamp': true,
            'prettyPrint': true,
            'showLevel': true,
            'debugStdout': true,
            'handleExceptions': false
        };

    return {
        'jobs': [
            {
                'subject': 'Email sent every 5 minutes',
                'body': 'Hi, please see attached',
                'bodyHtml': 'Hi! <br /> <br /> Please see attached <br /><br />- The team',
                'page': {
                    'url': 'http://www.mindera.com/',
                    'method': 'get',
                    'data': ''
                },
                'cron': '0 */5 * * * *',
                'from': {
                    'name': 'From Name',
                    'email': 'noreply@mindera.com'
                },
                'to': ['joe@example.com'],
                'cc': ['moo@example.com'],
                'paperSize': paperSize,
                'transport': transport
            }
        ],
        'automaticConfigReload': true,
        'timezone': 'Europe/London',
        'winston': winston
    }

})();