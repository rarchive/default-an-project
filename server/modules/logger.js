import log4js from 'log4js';
import path from 'path';

log4js.configure(path.join(__dirname, '../../logger.json'));

export const httpLogger = () => log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' });
export const logger = log4js.getLogger('default');
