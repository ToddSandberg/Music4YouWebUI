import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function saveListConfigurations(listConfiguration) {
    return APIHelper.put(APIPaths.saveListConfigurations, listConfiguration);
}

export function getListConfigurations() {
    return APIHelper.get(APIPaths.getListConfigurations, {});
}