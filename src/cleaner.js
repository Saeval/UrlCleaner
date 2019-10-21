const amazonTrackingStartParameter = '/ref';

const utmParameters = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
];

function redirect(requestDetails) {
    const requestUrl = requestDetails.url;

    if (urlContainsAtLeastOneBlacklistedParameter(requestUrl))
        return { redirectUrl: cleanedUrl(requestUrl) };

    if (isAnAmazonSuperUrl(requestUrl))
        return {redirectUrl: cleanFromAmazonTrackers(requestUrl) };

    return requestUrl;
}

function cleanedUrl(url) {
    let baseUrl = url.substring(0, url.indexOf('?'));
    let parametersAndValues = url.substring(baseUrl.length + 1);
    let parameters = [];
    let values = [];
    let cleanedParameters = "?";

    parseAndFillParametersAndValues(parametersAndValues, parameters, values);

    for(let i = 0; i < parameters.length; i++){
        let parameter = parameters[i];
        if (parameterIsAllowed(parameter))
            cleanedParameters += `${parameter}=${values[i]}&`;
    }

    return `${baseUrl}${trimLastCharacter(cleanedParameters)}`;
}

function parseAndFillParametersAndValues(parametersAndValues, parameters, values) {
    for (let i = 0; i < countParameters(parametersAndValues); i++) {
        let parameterAndValue = parametersAndValues.split('&')[i];
        let parameter = parameterAndValue.split('=')[0];
        let value = parameterAndValue.split('=')[1];

        parameters.push(parameter);
        values.push(value);
    }
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

function isAnAmazonSuperUrl(url) {
    return url.includes('.amazon.') && url.includes(amazonTrackingStartParameter);
}

function cleanFromAmazonTrackers(url) {
    return url.substring(0, url.indexOf(amazonTrackingStartParameter));
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:["<all_urls>"]},
    ["blocking"]
);