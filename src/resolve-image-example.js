function start(el, options) {
    const {resolveImageUrl} = options;
    const exampleEl = document.createElement('div');
    exampleEl.classList.add('rb-example__example', 'rb-example__render-image');

    const headlineEl = document.createElement('h2');
    headlineEl.classList.add('rb-example__subheading');
    headlineEl.innerText = 'resolveImageUrl';
    exampleEl.appendChild(headlineEl);

    const documentationEl = document.createElement('pre');
    documentationEl.classList.add('rb-example__documentation');
    documentationEl.innerText = `
resolveImage accepts one argument.
  1. An object with the following possibilities:
    imageEndpoint: A content repository endpoint pointing to an image asset (e.g. /v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1)
    options:
      width: The desired width of the image (required).
      and one of the following:
        - aspectRatio: The aspect ratio as number, e.g. 1.78 for 16/9 (calculated as width / height)
        - height: The desired height of the image

    NOTE: The width, height and aspectRatio parameters only work for images that do have an imageProvider other than 'absolute', as the transformation is done on the image server, not on the client.

Examples:
  resolveImageUrl({imageEndpoint: "/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1", options: { width: 500, aspectRatio: 1.78}});
  resolveImageUrl({imageEndpoint: "/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1", options: { width: 500, height: 200}});
    `;
    exampleEl.appendChild(documentationEl);

    const imageExampleEl = document.createElement('div');
    imageExampleEl.classList.add('rb-example__image');
    const imageEl = document.createElement('img');
    imageExampleEl.appendChild(imageEl);
    exampleEl.appendChild(imageExampleEl);

    el.appendChild(exampleEl);

    const exampleImageEndpoint = '/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1';

    return resolveImageUrl({imageEndpoint: exampleImageEndpoint, options: {width: 400, aspectRatio: 1}}).then((imageUrl) => {
        imageEl.setAttribute('src', imageUrl);
    });
}

export {start};