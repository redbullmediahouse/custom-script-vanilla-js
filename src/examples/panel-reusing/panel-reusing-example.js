import '../../styles.css';
import '../../markdown.css';
import markdown from './README.md';

let scriptEl;

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;
    scriptEl = el;

    el.innerHTML = `
        <div class="rb-example__example rb-example__rb-reusing">
            <div class="rb-example__documentation markdown-body">
                ${markdown}
            </div>                      
        </div>
    `

    function reusePanelWithConfig(newConfig) {
        console.log('reusePanelWithConfig');

        const newElement = document.createElement('div');
        newElement.innerText = 'Script was reused';

        scriptEl.appendChild(newElement)
    }


    function shouldReusePanelWithConfig() {
        console.log('shouldReusePanelWithConfig');
        return true;
    }

    return Promise.resolve({reusePanelWithConfig, shouldReusePanelWithConfig});
}

const canHandlePrerenderedDom = false;

export {start, canHandlePrerenderedDom};
