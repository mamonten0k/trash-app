import { IData, ISource, IAppView, IArticle } from '../../types/interfaces';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView implements IAppView {
    news; 
    sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData) {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IData) {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
