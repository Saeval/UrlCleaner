let redirect = require('./redirect');

test('clean url', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it');
});

test('clean url with parameter', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?parameterToNotDelete=1234' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it?parameterToNotDelete=1234');
});

test('one parameter', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?utm_source=reddit' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it');
});

test('two parameters - before', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?utm_source=reddit&otherParameter=false' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it?otherParameter=false');
});


test('two parameters - after', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?otherParameter=false&utm_source=reddit' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it?otherParameter=false');
});

test('three parameters', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?utm_term=searched&utm_source=reddit&utm_campaign=sarcazzo' };
    expect(redirect(fakeRequest)).toBe('https://www.dominioacaso.it');
});

