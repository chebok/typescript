abstract class Logger {
  abstract log(message: string): void;

  printDate(date: Date = new Date()): void {
    this.log(date.toDateString());
  }
}

class RealLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }

  logWithDate(message: string): void {
    this.printDate();
    this.log(message);
  }
}

const logger = new RealLogger();
logger.logWithDate('Abrams');