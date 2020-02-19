import './styles.css';
import * as resolveImageExample from './resolve-image-example';
import * as renderInlineVideoExample from './render-inline-video-example';
import * as resolveTranslationExample from './resolve-translation-example';
import * as rbAccountExample from './rb-account-example';
import * as panelReusingExample from './panel-reusing-example';

const examples = [
    resolveImageExample,
    renderInlineVideoExample,
    resolveTranslationExample,
    rbAccountExample,
    panelReusingExample
];

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;

    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('custom-script-example')
    const titleEl = document.createElement('h1');
    titleEl.classList.add('rb-example__headline');
    titleEl.innerText = 'VanillaJS Custom Script Example';
    wrapperEl.appendChild(titleEl);

    const examplesEl = document.createElement('div');
    wrapperEl.appendChild(examplesEl);

    el.appendChild(wrapperEl);

    const startPromises = examples.map(example => example.start && example.start(examplesEl, options));

    return Promise.all(startPromises)
        .then(() => ({
            stop: function() {
                console.log('Custom Script stopped');
                return Promise.resolve();
            }
        }));
}

function attach() {
    examples.forEach(example => example.attach && example.attach());
}

export {start, attach};