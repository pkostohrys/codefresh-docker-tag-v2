const config = require('./config');
const DockerHubService = require('./DockerHubService');
const RegistryService = require('./RegistryService');

class ServiceManager {
    constructor(service) {
        this.service = service;
    }

    async exec() {
        await this.service.retagImage();
    }
}

const getService = registry => {
    switch (registry) {
        case 'dockerhub': return DockerHubService;
        default: return RegistryService;
    }
}

async function main() {
    if (config.registry !== 'dockerhub') {
        throw new Error('Plugin supports only docker hub registry for now')
    }

    const Service = getService(config.registry);
    const service = new Service(config);
    const sm = new ServiceManager(service);
    await sm.exec();
}

main().catch(err => {
    console.error(err.stack);

    process.exit(1);
});
