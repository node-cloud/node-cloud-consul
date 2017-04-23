//common lib
import ConsulClient from 'consul';

//private module
import { getIPAddress, md5 } from './util';

export default class Consul {
    constructor(options = {}) {
        const service = options.service || {};
        const ip = getIPAddress();

        const defaultCheck = {
            id: "api",
            name: `HTTP API on port ${service.port}`,
            http: `http://${service.discoveryHost || ip}:${service.port}/health`,
            interval: "10s",
            timeout: "1s"
        };

        this.service = {
            id: service.id || md5(`${service.discoveryHost || ip}:${service.port}`),
            tags: service.tags,
            name: service.name,
            address: service.discoveryHost || ip,
            port: service.port,
            check: service.check || defaultCheck
        };

        this.service = options.service;
        this.client = new ConsulClient({
            host: options.host,
            port: options.port
        });
    }

    /**
     * Get health service list.
     *
     * @param name
     * @return {Promise}
     */
    getHealthServices(name) {
        return new Promise((resolve, reject) => {
            this.client.health.service({
                service: name,
                passing: true
            }, function (err, result) {
                if (err) return reject(err);

                resolve(result);
            });
        });
    }

    /**
     * Register this service.
     */
    registerService() {
        return new Promise((resolve, reject) => {
            this.client.agent.service.register(service, function (err) {
                if (err) {
                    return reject(err, this.service);
                }

                return resolve(this.service);
            });
        });
    }

    /**
     * Cancel register this service.
     */
    deregisterService() {
        return new Promise((resolve, reject) => {
            this.client.agent.service.deregister(this.service.id, err => {
                if (err) {
                    return reject(err, this.service);
                }

                resolve(this.service);
            });
        });
    }

    /**
     * Watch
     *
     * @param options
     * @param change
     * @param error
     */
    watchHealthService(options, change, error) {
        const watcher = this.client.watch({ method: this.client.health.service, options: options });
        watcher.on('change', function (data, res) {
            change && change(data, res);
        });

        watcher.on('error', function (err) {
            error && error(err);
        });
    }

    /**
     * Get the node-consul client.
     * @return {ConsulClient|Consul}
     */
    getConsulClient() {
        return this.client;
    }
}