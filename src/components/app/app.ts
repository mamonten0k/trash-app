import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IAppController, IAppView, IData } from '../../types/interfaces';

interface IApp {
    controller: IAppController,
    view: IAppView,
    start(): void,
}

class App {
    controller: IAppController;
    view: IAppView;

    constructor() {
        this.controller = new AppController();
    this.view = new AppView();
    }

    start() {
        const sourcesContainer = document.querySelector('.sources') as HTMLElement;

        this.controller.drawOnPageLoad('abc-news', (data: IData) => this.view.drawNews(data))

        if(sourcesContainer) {
            sourcesContainer
                .addEventListener('click', 
                    (e) => this.controller.getNews(e, (data: IData) => this.view.drawNews(data)));
        }   
        
        this.controller.getSources((data: IData) => this.view.drawSources(data));
    }
}

export default App;
