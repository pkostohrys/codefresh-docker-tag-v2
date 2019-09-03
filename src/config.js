const axios = require('axios').default;

// if (process.env.DEBUG) {
//     axios.interceptors.request.use(req => {
//         console.log('------- REQUEST --------');
//         console.log('url: ', req.url);
//         console.log('method: ', req.method);
//         console.log('headers: ', req.headers);
//         console.log('data: ', req.data);
//         console.log('------- REQUEST END--------\n');

//         return req;
//     });

//     axios.interceptors.response.use(res => {
//         console.log('------- RESPONSE --------');
//         console.log('url: ', res.request.path);
//         console.log('status: ', res.status);
//         console.log('data: ', res.data);
//         console.log('------- RESPONSE END--------\n');

//         return res;
//     }, err => {
//         console.log(err.response);

//         return Promise.reject(err.response);
//     });
// }

const availableRegistries = {
    'dockerhub': 'https://registry-1.docker.io'
};


const {
    USERNAME,
    PASSWORD,
    IMAGE_NAME,
    IMAGE_TAG,
    NEW_TAG,
    REGISTRY,
} = process.env;

module.exports = {
    registry: REGISTRY,
    credentials: {
        username: USERNAME,
        password: PASSWORD,
    },
    targetImage: {
        name: IMAGE_NAME,
        tag: IMAGE_TAG
    },
    newTag: NEW_TAG,
    availableRegistries
};
