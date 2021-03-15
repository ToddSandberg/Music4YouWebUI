import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function saveSongs(songs) {
    return APIHelper.put(APIPaths.saveSongs, songs);
}

export function getSongs() {
    return APIHelper.get(APIPaths.getSongs, {});
}