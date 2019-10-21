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
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.dominioacaso.it');
});

test('two parameters - before', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?utm_source=reddit&otherParameter=false' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.dominioacaso.it?otherParameter=false');
});

test('two parameters - after', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?otherParameter=false&utm_source=reddit' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.dominioacaso.it?otherParameter=false');
});

test('three parameters', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?utm_term=searched&utm_source=reddit&utm_campaign=sarcazzo' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.dominioacaso.it');
});

test('parameters with special characters', () => {
    let fakeRequest = { url: 'https://www.dominioacaso.it?parameter1=#weird1&utm_source=reddit&parameter2=searched+term&parameter3=searched%20for%20something' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.dominioacaso.it?parameter1=#weird1&parameter2=searched+term&parameter3=searched%20for%20something');
});

test('clean from Amazon tracking parameters', () => {
    let fakeRequest = { url: 'https://www.amazon.it/dp/B07TWFWJDZ/ref=gw_it_desk_mso_dc_avs_fb2?pf_rd_p=20b26d4f-6012-4fe3-895c-e19408030a84&pf_rd_r=QC8WEXJ0NARV4FNTDFYC' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.amazon.it/dp/B07TWFWJDZ');
});

test('clean from Amazon tracking parameters, 2', () => {
    let fakeRequest = { url: 'https://www.amazon.it/dp/B07MJBQJ41/ref=cm_sw_r_other_apa_i_SkjKDbXJZRG6C' };
    expect(redirect(fakeRequest).redirectUrl).toBe('https://www.amazon.it/dp/B07MJBQJ41');
});
