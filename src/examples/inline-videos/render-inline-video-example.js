import styles from '../../styles.css';
import markdownStyles from '../../markdown.css';
import markdown from './README.md';

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;

    const {renderInlineVideoPlayer} = options;

    el.innerHTML = `
        <style type="text/css">
            ${styles}
        </style>
        <style type="text/css">
            ${markdownStyles}
        </style>
        <div class="rb-example__example rb-example__render-video">
            <div class="rb-example__documentation markdown-body">
                ${markdown}
            </div>
            <div class="rb-example__video"></div>
        </div>
    `

    const videoExampleEl = el.querySelector('.rb-example__video');
    const exampleVideoEndpoint = '/v3/api/graphql/v1/v3/query/en-INT?filter[type]=videos&page[limit]=1&rb3Schema=v1:video';

    return renderInlineVideoPlayer(exampleVideoEndpoint, null, videoExampleEl).then(() => ({stop: () => {
        console.log('stop');
    }}));
}

export {start};
