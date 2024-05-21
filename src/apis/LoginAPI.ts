import type { Credentials } from 'models/models';
import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function createAccount(creds: Credentials) {
    return APIHelper.put(APIPaths.createAccount, { creds });
}

export function login(creds: Credentials) {
    return APIHelper.put(APIPaths.login, { creds });
}