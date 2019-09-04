class ServiceManager {
    constructor(service) {
        this.service = service;
    }

    async exec() {
        await this.service.retagImage();
    }
}

module.exports = ServiceManager;
