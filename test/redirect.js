const utmParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function redirect(requestDetails) {
    return urlContainsAtLeastOneBlacklistedParameter(requestDetails.url) ?
        cleanedUrl(requestDetails.url) :
        requestDetails.url;
}

function cleanedUrl(url) {
    let baseUrl = url.substring(0, url.indexOf('?'));
    let parametersAndValues = url.substring(baseUrl.length + 1);
    let parameters = [];
    let values = [];
    let cleanedParameters = "?";

    for(let i = 0; i < countParameters(parametersAndValues); i++){
        let parameterWithValue = parametersAndValues.split("&")[i];
        let parameter = parameterWithValue.split('=')[0];
        let value = parameterWithValue.split('=')[1];

        parameters.push(parameter);
        values.push(value);
    }

    for(let i = 0; i < parameters.length; i++){
        let parameter = parameters[i];
        if (parameterIsAllowed(parameter))
            cleanedParameters += `${parameter}=${values[i]}&`;
    }

    return `${baseUrl}${trimLastCharacter(cleanedParameters)}`;
}

function urlContainsAtLeastOneBlacklistedParameter(url){
    return utmParameters.some(p => url.toLowerCase().indexOf(p) !== -1)
}

function countParameters(url) {
    return (url.match(/&/g) || []).length + 1;
}

function parameterIsAllowed(parameter) {
    return !utmParameters.includes(parameter);
}

function trimLastCharacter(value) {
    return value.substring(0, value.length - 1)
}

module.exports = redirect;