import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function createAccount(creds) {
    return APIHelper.put(APIPaths.createAccount, { creds });
}

export function login(creds) {
    return APIHelper.put(APIPaths.login, { creds });
}