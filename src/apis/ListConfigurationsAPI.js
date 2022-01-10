import APIPaths from '../constants/apiPaths';
import APIHelper from './APIHelper';

export function saveListConfiguration(id, listConfiguration) {
    return APIHelper.put(APIPaths.saveListConfigurations, { id, listConfiguration });
}

export function getListConfigurations(id) {
    return APIHelper.put(APIPaths.getListConfigurations, { id });
}