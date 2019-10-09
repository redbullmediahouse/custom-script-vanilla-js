function start(el, options) {
    const {resolveTranslation} = options;
    const exampleEl = document.createElement('div');
    exampleEl.classList.add('rb-example__example', 'rb-example__resolve-translation');

    const headlineEl = document.createElement('h2');
    headlineEl.classList.add('rb-example__subheading');
    headlineEl.innerText = 'resolveTranslation';
    exampleEl.appendChild(headlineEl);

    const documentationEl = document.createElement('pre');
    documentationEl.classList.add('rb-example__documentation');
    documentationEl.innerText = `
resolveTranslation accepts one or two arguments.
    1. A translation label, e.g. 'global.default_title'
    2. (optional) The fallback text to use, if no translation is available for the given label
    
For a List of available translations, you can inspect "window.RBGEMC_TRANSLATIONS"
`;
    exampleEl.appendChild(documentationEl);

    const translationExampleEl = document.createElement('div');
    translationExampleEl.classList.add('rb-example__translation');

    const translationEl = document.createElement('span');
    const translationKey = 'global.default_title';
    const translation = resolveTranslation(translationKey);
    translationEl.innerText = `"${translationKey}" resolved to "${translation}"`;
    translationExampleEl.appendChild(translationEl);

    exampleEl.appendChild(translationExampleEl);

    el.appendChild(exampleEl);

    return Promise.resolve();
}

export {start};