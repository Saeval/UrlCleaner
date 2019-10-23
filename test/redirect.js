let urlParser = require('./urlParser');

const amazonTrackingStartParameter = '/ref';
const amazonProductPageIdentifier = '/dp';

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

    if (isAmazonSuperUrl(requestUrl))
        return {redirectUrl: cleanFromAmazonTrackers(requestUrl) };

    return requestUrl;
}

function cleanedUrl(url) {
    let parsedUrl = new urlParser().parse(url);
    let cleanedParameters = "?";

    for(let i = 0; i < parsedUrl.parameters.length; i++){
        let parameter = parsedUrl.parameters[i];
        if (parameterIsAllowed(parameter))
            cleanedParameters += `${parameter}=${parsedUrl.values[i]}&`;
    }

    return `${parsedUrl.baseUrl}${trimLastCharacter(cleanedParameters)}`;
}

function urlContainsAtLeastOneBlacklistedParameter(url){
    return utmParameters.some(p => url.toLowerCase().includes(p))
}

function isAmazonSuperUrl(url) {
    return url.includes('.amazon.') &&
           url.includes(amazonProductPageIdentifier) &&
           url.includes(amazonTrackingStartParameter);
}

function parameterIsAllowed(parameter) {
    return !utmParameters.includes(parameter);
}

function trimLastCharacter(value) {
    return value.substring(0, value.length - 1)
}

function cleanFromAmazonTrackers(url) {
    return url.substring(0, url.indexOf(amazonTrackingStartParameter));
}

module.exports = redirect;