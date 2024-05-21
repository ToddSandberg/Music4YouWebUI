import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    responseType: 'json'
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function put(endpoint: string, data: any) {
    return instance({
        method: 'put',
        url: endpoint,
        data
    });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function get(endpoint: string, data: any) {
    return instance({
        method: 'get',
        url: endpoint,
        data
    });
}

export default {
    put,
    get
};