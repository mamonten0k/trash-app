import { Loader } from './loader';
import { IAppLoader } from '../../types/interfaces';

class AppLoader extends Loader implements IAppLoader {
    constructor() {
        super('https://newsapi.org/v2/', {
            endpoint: '',
            apiKey: '7d2dc3ccd8e045dfbcfcbee8defb6279',
        });
    }
}

export { AppLoader };
