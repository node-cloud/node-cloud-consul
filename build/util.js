import md5encode from 'blueimp-md5';

/**
 * Get ip address.
 *
 * @return {*}
 */
export function getIPAddress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        if (!interfaces.hasOwnProperty(devName)) {
            continue;
        }

        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

/**
 * md5
 *
 * @param   str 字符串
 * @param   key 秘钥
 */
export function md5(str, key) {
    return md5encode(str, key);
}