import { AppLoader } from './appLoader';
import { IAppController, IData } from '../../types/interfaces';

class AppController extends AppLoader implements IAppController{
    getSources(callback: (data: IData) => void):void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: IData) => void):void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if(!target) return;

            if (!target.classList.contains('source__item')) {
                if(target.parentNode) target = target.parentNode as HTMLElement;
                continue;
            }

            const sourceId: string | null = target.getAttribute('data-source-id');

            if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                super.getResp(
                    {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    },
                    callback
                );
            }
            return;
        }
    }

    drawOnPageLoad(sourceId: string, callback: (data: IData) => void):void {
        super.getResp(
            {
                endpoint: 'everything',
                options: {
                    sources: sourceId,
                },
            },
            callback
        );
    }
}

export default AppController;
