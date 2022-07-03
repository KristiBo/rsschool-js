import { EverythingInt, SourcesInt, ErrStatus, CallB } from '../types/types';

class Loader {
    private readonly baseLink: string;
    private options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint = '', options = {} },
        callback: CallB<EverythingInt | SourcesInt> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrStatus.Unauthorized || res.status === ErrStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    protected load(method: 'GET', endpoint: string, callback: CallB<EverythingInt | SourcesInt>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<EverythingInt | SourcesInt> => res.json())
            .then((data: EverythingInt | SourcesInt) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
