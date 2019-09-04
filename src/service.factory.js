const DockerHubService = require('./docker-hub');

class ServiceFactory {
    constructor(config) {
        this.config = config;
    }

    createService() {
        const Service = this.chooseService();
        return new Service(this.config);
    }

    chooseService() {
        switch (this.config.registry) {
            case 'dockerhub': return DockerHubService
            default: throw new Error('Registry does not supported');
        }
    }
}

module.exports = ServiceFactory;
