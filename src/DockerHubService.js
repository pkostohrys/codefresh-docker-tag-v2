const axios = require('axios').default;

const RegistryService = require('./RegistryService');

class DockerHubService extends RegistryService {
    constructor(data) {
        super(data);
        this.getUrl = newTag =>
            `${this.registryUrl}/v2/${this.targetImage.name}/manifests/${newTag || this.targetImage.tag || 'latest'}`;
        this.manifest = {};
    }

    async _auth() {
        console.info('Authenticating with provided credentials...');
        const res = await axios({
            method: 'GET',
            url: `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${this.targetImage.name}:pull,push`,
            headers: { Authorization: `Basic ${this.base64Creds}` }
        });

        return res.data.token;
    }

    _getManifest(token) {
        const headers = { 'Authorization': `Bearer ${token}` };
        return axios.get(this.getUrl(), { headers, responseType: 'text', transformResponse: data => data });
    }

    _uploadNewManifest(manifest, token) {
        const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'text/plain' };
        return axios({
            url: this.getUrl(this.newTag),
            data: manifest,
            headers,
            method: 'PUT',
        });
    }

    async retagImage() {
        try {
            const token = await this._auth();
            if (token) {
                const { data: manifest } = await this._getManifest(token);
                const res = await this._uploadNewManifest(manifest, token);

                if (String(res.status).match(/20[01]/)) {
                    console.info('Image tagged successfully');
                } else {
                    throw new Error(`Error has occurred while image updating, ${res.status} ${res.statusText}`);
                }

            } else {
                throw new Error('Error has occurred while authorization, check your credentials.');
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = DockerHubService;