import { Socket } from 'socket.io';

enum NotificationLevel {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

const logNotification = (
  level: NotificationLevel,
  socket: Socket,
  message: string,
) => {
  const data = JSON.stringify({ level, message });
  socket.emit('notify', data);
};

export default {
  successMessage: (socket: Socket, message: string) =>
    logNotification(NotificationLevel.SUCCESS, socket, message),
  infoMessage: (socket: Socket, message: string) =>
    logNotification(NotificationLevel.INFO, socket, message),
  warningMessage: (socket: Socket, message: string) =>
    logNotification(NotificationLevel.WARNING, socket, message),
  errorMessage: (socket: Socket, message: string) =>
    logNotification(NotificationLevel.ERROR, socket, message),
};
