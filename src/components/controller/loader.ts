import { IData } from '../../types/interfaces';
import { IOptions, ILoader } from '../../types/interfaces';

class Loader implements ILoader{
    baseLink: string;
    options: Object;
    
    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }:IOptions,
        callback: (data: IData) => void = () => {
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response):Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Object, endpoint: string):string {
        const urlOptions = <Object>{ ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof Object]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IData) => void, options: Object = {}):void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json()) 
            .then((data: IData) => callback(data))
            .catch((err) => console.error(err));
    }
}

export { Loader };
