import './news.css';
import { IArticle, INews } from '../../../types/interfaces';

class News implements INews {
    draw(data: IArticle[]):void {
        const news = data.length >= 10 ? data.filter((_item, index) => index < 10) : data;
        const newsContainer = document.querySelector('.news') as HTMLElement;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if(!newsItemTemp || !newsContainer) return;

        news.forEach((item: IArticle, index: number):void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if(!newsClone) return;

            const newsItem = newsClone.querySelector('.news__item') as HTMLElement;
            if (index % 2) newsItem.classList.add('alt');

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if(metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            if(metaAuthor) metaAuthor.textContent = item.author || item.source.name;

            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            if(metaDate) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            if(descriptionTitle) descriptionTitle.textContent = item.title;

            const descriptionSource = newsClone.querySelector('.news__description-source');
            if(descriptionSource) descriptionSource.textContent = item.source.name;

            const descriptionContent = newsClone.querySelector('.news__description-source');
            if(descriptionContent) descriptionContent.textContent = item.description;

            const descriptionFuther = newsClone.querySelector('.news__read-more a');
            if(descriptionFuther) descriptionFuther.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export {News};
