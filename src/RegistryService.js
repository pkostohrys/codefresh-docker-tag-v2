class RegistryService {
    constructor({ credentials, targetImage, newTag, registry, availableRegistries }) {
        this.base64Creds = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
        this.targetImage = targetImage;
        this.newTag = newTag;
        this.registryUrl = availableRegistries[registry] || registry;
        
        console.info(`Using following registry url - ${this.registryUrl}`);
    }

    retagImage() {
        console.log('Not implemented for now')
    }
}

module.exports = RegistryService;