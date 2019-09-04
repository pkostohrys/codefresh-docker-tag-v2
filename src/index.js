const config = require('./config');
const ServiceFactory = require('./service.factory');
const ServiceManager = require('./service.manager');

async function main() {
    if (config.registry !== 'dockerhub') {
        throw new Error('Plugin supports only docker hub registry for now')
    }

    const service = new ServiceFactory(config).createService();
    const sm = new ServiceManager(service);
    await sm.exec();
}

main().catch(err => {
    if (err.isAxiosError) {
        const { config, response } = err;
        console.error(`Error ocurred while perfoming following request: ${config.method} ${config.url}`);

        if (response.status === 401) {
            console.error('Please, check your credentials');
        }
    }

    console.error(err.stack);

    process.exit(1);
});
