const axios = require('axios').default;

const RegistryService = require('../registry.service');

class DockerHubService extends RegistryService {
    constructor(data) {
        super(data);
        this.base64Creds = Buffer.from(`${data.credentials.username}:${data.credentials.password}`).toString('base64');
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
}

module.exports = DockerHubService;