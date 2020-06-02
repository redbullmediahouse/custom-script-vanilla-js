import '../../styles.css';
import '../../markdown.css';
import markdown from './images.md';

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;

    const {resolveImageUrl} = options;

    el.innerHTML = `
        <div class="rb-example__example rb-example__render-image">
            <div class="rb-example__documentation markdown-body">
                ${markdown}
            </div>
            <div class="rb-example__image-wrapper">
                <img class="rb-example__image">
            </div>
        </div>
    `;

    const imageEl = el.querySelector('.rb-example__image');
    const exampleImageEndpoint = '/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1';

    return resolveImageUrl({imageEndpoint: exampleImageEndpoint, options: {width: 400, aspectRatio: 1}}).then((imageUrl) => {
        imageEl.setAttribute('src', imageUrl);
        return {stop: () => {}};
    });
}

export {start};
