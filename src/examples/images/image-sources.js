import styles from '../../styles.css';
import markdownStyles from '../../markdown.css';
import markdown from './README.md';

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config} = params;

    // available parameters
    const width = 500;
    const height = 400;
    const mode = "crop"; // can be `crop` or `scale`

    // Important: Make sure to change the apiKey `test` to your own
    // Even more important: DO NOT USE THE API KEY ON THE FRONT END
    // Please make a proxy backend service to hide your API so it is not public
    const apiKey = 'test'
    const storedQueryId = 'rrn:gql-queries:5b425015-4580-5cd3-ba10-6cb45cedcddc';
    const imageId = 'rrn:content:images:062e3777-9365-40ec-a328-1279f69307e2:en-INT';
    const storedQueryUrl = `https://api.redbull.com/v1/graphql/${storedQueryId}?id=${encodeURIComponent(imageId)}&width=${width}&height=${height}&mode=${mode}&apiKey=${apiKey}`;

    return fetch(storedQueryUrl)
        .then(res => res.json())
        .then(result => {
            const {imageSrc} = result.data.resource;
            el.innerHTML = `
                <style type="text/css">
                    ${styles}
                </style>
                <style type="text/css">
                    ${markdownStyles}
                </style>
                <div class="rb-example__example rb-example__render-image">
                    <div class="rb-example__documentation markdown-body">
                        ${markdown}
                    </div>
                    <div class="rb-example__image-wrapper">
                        <img class="rb-example__image" src="${imageSrc}">
                    </div>
                </div>
            `
            return {stop: () => console.log('stopped')}
        })
}

export {start};
