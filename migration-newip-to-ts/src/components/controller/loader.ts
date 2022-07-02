import { EverythingInt, SourcesInt, ErrStatus } from '../../types/types';

class Loader {
    baseLink: string;
    options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint = '', options = {} },
        callback: (data: EverythingInt | SourcesInt) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrStatus.Unauthorized || res.status === ErrStatus.PaymentRequired)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: 'GET', endpoint: string, callback: (data: EverythingInt | SourcesInt) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: EverythingInt | SourcesInt) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
