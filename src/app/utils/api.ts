import request, { Response } from 'superagent';
import { HOST } from './constants';

const req = (url: string, method: string, headers: Object, data: Object) =>
    new Promise((resolve: (value: Response) => void) => {
        request(method.toLowerCase(), url)
            .set(headers)
            .set('Accept', 'application/json')
            .send(data)
            .then((res: Response) => resolve(res));
    });

const api = (route: string, method: string, absolutePath: boolean = false, data: Object = {}, headers: Object = {}) =>
    new Promise((resolve: (value: Response) => void, reject: (value: string) => void) => {

        const url = `${absolutePath ? '' : HOST}${route}`;

        return req(url, method, headers, data).then(res => {

            if (!res) {
                reject('API Error');
                return;
            }

            if (res.status >= 300) {
                const errorMessage = res.body.message
                    ? res.body.message
                    : res.body.errorMessage
                    ? res.body.errorMessage
                    : '';

                reject(errorMessage || 'Server error');
                return;
            }
            resolve(res);
        });
    });

const errorHandler = (error: any) => {
    // to be taken care of later ^^
    console.log('Error: ', error);
};

const formatPattern = (url: string, params: any) => {
    let replacedUrl = url;
    Object.keys(params).map(key => {
        replacedUrl = replacedUrl.replace(`:${key}`, encodeURIComponent(params[key]));
        return null;
    });
    return replacedUrl;
};

export { api, formatPattern, errorHandler };
