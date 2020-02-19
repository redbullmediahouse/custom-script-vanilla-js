function start(el, options) {
    const {getRBAccount} = options;
    const exampleEl = document.createElement('div');
    exampleEl.classList.add('rb-example__example', 'rb-example__rb-reusing');

    const headlineEl = document.createElement('h2');
    headlineEl.classList.add('rb-example__subheading');
    headlineEl.innerText = 'Panel Reusing';
    exampleEl.appendChild(headlineEl);

    const documentationEl = document.createElement('pre');
    documentationEl.classList.add('rb-example__documentation');
    documentationEl.innerText = `This is an advanced functionality that allows some frameworks to use the capabilities
    of the reusing or rerendering partially the dom. It can also be use without a framework.
    reusePanelWithConfig will give you access to the config and the element where the element is already rendered
        you can use this method to either make a diff of the dom and replace the node or even leave it as is.
    shouldReusePanelWithConfig returns a boolean and lets the system know if the panel should be reused.
    `;

    exampleEl.appendChild(documentationEl);

    el.appendChild(exampleEl);
    /*
        reusePanelWithConfig will give you access to the config and the element where the element is already rendered
        you can use this method to either make a diff of the dom and replace the node or even leave it as is.
     */
    function reusePanelWithConfig({config, channels, el, queryParams}) {
        return {};
    }
    /*
        shouldReusePanelWithConfig returns a boolean and lets the system know if the panel should be reused.
     */
    function shouldReusePanelWithConfig() {
        return true;
    }
    return Promise.resolve({reusePanelWithConfig, shouldReusePanelWithConfig});
}

export {start};