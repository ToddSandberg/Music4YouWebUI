import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function saveSongs(id, songs) {
    return APIHelper.put(APIPaths.saveSongs, { id, songs });
}

export function getSongs(id) {
    return APIHelper.put(APIPaths.getSongs, { id });
}