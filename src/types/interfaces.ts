// Props INTERFACES

export interface IData {
	status: string,
	totalResult: number | string,
	articles: IArticle[];
	sources: ISource[];
}

export interface IArticle {
	source: IArticleSource,
	author: string | null,
	title: string,
	description: string,
	url: string,
	urlToImage: string,
	publishedAt: string,
	content: string,
}

export interface IArticleSource {
	id: string,
	name: string | null
}

export interface ISource {
	category: string,
	country: string,
	description: string,
	id: string,
	language: string,
	name: string | null,
	url: string
}

export interface IOptions {
    apiKey?: string,
    endpoint: string,
    options?: Object,
}

//Class INTERFACES

export interface INews {
    draw(data: IArticle[]):void,
}

export interface ISources {
    draw(data: ISource[]):void,
}

export interface IAppView {
    sources: ISources,
    news: INews,
	drawNews(data: IData):void,
	drawSources(data: IData): void,
}

export interface IAppLoader extends ILoader {}

export interface IAppController extends ILoader {
    getSources(callback: (data: IData) => void): void;
    getNews(e: Event, callback: (data: IData) => void): void;
	drawOnPageLoad(sourceId: string, callback: (data: IData) => void): void;
}

export interface ILoader {
    baseLink: string,
    options: Object,
    getResp(options: IOptions, callback: () => void):void,
    errorHandler(res: Response): Response,
    makeUrl(options: Object, endpoint: string): string,
    load(method: string, endpoint: string, callback: (data: IData) => void, options: Object): void,
}