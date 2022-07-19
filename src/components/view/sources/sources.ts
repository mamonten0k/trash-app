import './sources.css';
import { ISource, ISources } from '../../../types/interfaces';

class Sources implements ISources {
    draw(data: ISource[]):void {
        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if(!sourceItemTemp || !sourcesContainer) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            if(itemName) itemName.textContent = item.name;
            
            const itemSource = sourceClone.querySelector('.source__item') as HTMLElement;
            if(itemSource) itemSource.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export {Sources};
