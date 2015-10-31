
export default class Logger {

  static log(method, args) {
    if (typeof console !== 'undefined' && console !== null)
      console[method].apply(console, args) // eslint-disable-line no-console
    else
      throw new Error('Logger log.not_found: logging interface not found.')
  }

  static debug() {
    Logger.log('debug', arguments)
  }

  static error() {
    Logger.log('error', arguments)
  }

  static info() {
    Logger.log('info', arguments)
  }

  static time() {
    Logger.log('time', arguments)
  }

  static timeEnd() {
    Logger.log('timeEnd', arguments)
  }

}
