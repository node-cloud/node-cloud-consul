//common lib
import winston from 'winston';

const logger = new winston.Logger({
    level: 'debug',
    transports: [new winston.transports.Console({
        level: 'silly',
        colorize: true
    })]
});

/**
 * The fatal level logger. It's the most serious error.
 *
 * @param msg
 * @param error
 */
export function fatal(msg, error) {
    logger.log('fatal', `${msg}${error ? ' The exception is ' + error : ''}`);
}

/**
 * The error level logger. When app throw some exception, please use it.
 *
 * @param msg
 * @param error
 */
export function error(msg, error) {
    logger.log('error', `${msg}${error ? ' The exception is ' + error : ''}`);
}

/**
 * The warn level logger. Maybe the app occurs something wrong.
 *
 * @param msg
 * @param error
 */
export function warn(msg, error) {
    logger.log('warn', `${msg}${error ? ' The exception is ' + error : ''}`);
}

/**
 * The info level logger.
 *
 * @param msg
 * @param error
 */
export function info(msg, error) {
    logger.log('info', `${msg}${error ? ' The exception is ' + error : ''}`);
}

/**
 * The debug level logger.
 *
 * @param msg
 * @param error
 */
export function debug(msg, error) {
    logger.log('debug', `${msg}${error ? ' The exception is ' + error : ''}`);
}