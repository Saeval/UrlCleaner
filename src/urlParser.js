class urlParser {
    parse(url) {
        let baseUrl = url.substring(0, url.indexOf('?'));
        let parametersAndValues = url.substring(baseUrl.length + 1);
        let parameters = [];
        let values = [];

        this.parseAndFillParametersAndValues(parametersAndValues, parameters, values);

        return { baseUrl: baseUrl, parameters: parameters, values: values };
    }

    parseAndFillParametersAndValues(parametersAndValues, parameters, values) {
        for (let i = 0; i < this.countParameters(parametersAndValues); i++) {
            let parameterAndValue = parametersAndValues.split("&")[i];
            let parameter = parameterAndValue.split('=')[0];
            let value = parameterAndValue.split('=')[1];

            parameters.push(parameter);
            values.push(value);
        }
    }

    countParameters(url) {
        return (url.match(/&/g) || []).length + 1;
    }
}