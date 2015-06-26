# Mail Web Schedule
Runs as a local service (OSX Only), downloads pages from a configured url and sends them as an email attachment to the recipient list.

# Install

Install the node dependencies and create a configuration file base on _exampleConfig.js_

    npm install

    cp exampleConfig config.js

    sudo node serviceInstall.js

See the process logs:

    tail -f /Library/Logs/MailWebSchedule/mailwebschedule.log


# Uninstall

    sudo node serviceUninstall.js



# Cron options
https://github.com/ncb000gt/node-cron

# Mail transport options
https://github.com/andris9/Nodemailer
