const axios = require('axios').default;

class RegistryService {
    constructor({ credentials, targetImage, newTag, registry, availableRegistries }) {
        this.credentials = credentials;
        this.targetImage = targetImage;
        this.newTag = newTag;
        this.registryUrl = availableRegistries[registry] || registry;
        this.schemaVersion = '1';
        this.token = '';

        console.info(`Using following registry url - ${this.registryUrl}`);
    }

    get computedHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': `application/vnd.docker.distribution.manifest.v${this.schemaVersion}+json`
        }
    }

    _getManifestUrl = newTag =>
        `${this.registryUrl}/v2/${this.targetImage.name}/manifests/${newTag || this.targetImage.tag || 'latest'}`;

    async _getManifest() {
        const { data: manifest } = await axios({
            method: 'GET',
            url: this._getManifestUrl(),
            headers: this.computedHeaders,
            responseType: 'text',
            transformResponse: data => data
        });

        //  getting manifest version
        const manifestObj = JSON.parse(manifest);
        this.schemaVersion = manifestObj.schemaVersion;

        return manifest;
    }

    _uploadNewManifest(manifest) {
        return axios({
            method: 'PUT',
            url: this._getManifestUrl(this.newTag),
            headers: this.computedHeaders,
            data: manifest,
        });
    }

    // Polymorphic
    // should return token
    _auth() { }

    async retagImage() {
        const token = await this._auth();
        if (token) {
            this.token = token;

            const manifest = await this._getManifest();
            const res = await this._uploadNewManifest(manifest);

            if (String(res.status).match(/20[01]/)) {
                console.info('Image tagged successfully');
            } else {
                throw new Error(`Error has occurred while image updating, ${res.status} ${res.statusText}`);
            }

        } else {
            throw new Error('Error has occurred while authorization, check your credentials.');
        }
    }
}

module.exports = RegistryService;
