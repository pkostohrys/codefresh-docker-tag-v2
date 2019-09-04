const axios = require('axios').default;

const RegistryService = require('../registry.service');

class AWSService extends RegistryService {
    constructor(data) {
        super(data);
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

module.exports = AWSService;