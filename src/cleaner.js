const amazonTrackingStartParameter = '/ref';
const amazonProductPageIdentifier = '/dp';

const utmParameters = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_brand',
    'utm_social-type',
    'fbclid',
    'gclid'
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
    return utmParameters.some(p => url.toLowerCase().indexOf(p) !== -1)
}

function parameterIsAllowed(parameter) {
    return !utmParameters.includes(parameter);
}

function trimLastCharacter(value) {
    return value.substring(0, value.length - 1)
}

function isAnAmazonSuperUrl(url) {
    return url.includes('.amazon.') &&
           url.includes(amazonTrackingStartParameter) &&
        (
           url.includes(amazonProductPageIdentifier) ||
           url.includes('/gp/')
        );
}

function cleanFromAmazonTrackers(url) {
    return url.substring(0, url.indexOf(amazonTrackingStartParameter));
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls:["<all_urls>"]},
    ["blocking"]
);