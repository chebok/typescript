"use strict";
class Logger {
    printDate(date = new Date()) {
        this.log(date.toDateString());
    }
}
class RealLogger extends Logger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate();
        this.log(message);
    }
}
const logger = new RealLogger();
logger.logWithDate('Abrams');
