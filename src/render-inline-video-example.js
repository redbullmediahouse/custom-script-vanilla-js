function start(el, options) {
    const {renderInlineVideoPlayer} = options;
    const exampleEl = document.createElement('div');
    exampleEl.classList.add('rb-example__example', 'rb-example__render-video');

    const headlineEl = document.createElement('h2');
    headlineEl.classList.add('rb-example__subheading');
    headlineEl.innerText = 'renderInlineVideoPlayer';
    exampleEl.appendChild(headlineEl);

    const documentationEl = document.createElement('pre');
    documentationEl.classList.add('rb-example__documentation');
    documentationEl.innerText = `
renderInlineVideoPlayer accepts 3 arguments.
    1. A content repository endpoint pointing to a video asset. The required \`rb3Schema=v1:video\` query parameter is added if not provided.
    2. A content repository endpoint loading a playlist. Not required for a single video.
    3. The DOM element the video player should be added to
`;
    exampleEl.appendChild(documentationEl);

    const videoExampleEl = document.createElement('div');
    videoExampleEl.classList.add('rb-example__video');
    exampleEl.appendChild(videoExampleEl);

    el.appendChild(exampleEl);

    const exampleVideoEndpoint = '/v3/api/composition/v3/query/en-INT?filter[type]=videos&page[limit]=1';

    return renderInlineVideoPlayer(exampleVideoEndpoint, null, videoExampleEl)
}

export {start};