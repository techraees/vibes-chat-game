enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  GAME = 'GAME DEBUG',
}

const logMessage = (level: LogLevel, message: string) => {
  console.log(`${level}: ${message}`);
};

export default {
  debugMessage: (message: string) => logMessage(LogLevel.DEBUG, message),
  infoMessage: (message: string) => logMessage(LogLevel.INFO, message),
  warningMessage: (message: string) => logMessage(LogLevel.WARNING, message),
  errorMessage: (message: string) => logMessage(LogLevel.ERROR, message),
  gameDebugMessage: (message: string) => logMessage(LogLevel.GAME, message),
};
