import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    responseType: 'json'
});

function put(endpoint, data) {
    return instance({
        method: 'put',
        url: endpoint,
        data
    });
}

function get(endpoint, data) {
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