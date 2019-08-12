import './styles.css';



function start(params) {
    const {el, config, options} = params;
    const {resolveTranslation, resolveImageUrl, renderInlineVideoPlayer} = options;

    const wrapper = document.createElement('div');
    wrapper.id = "custom-id";
    wrapper.className = 'custom-class';

    const title = document.createElement('h1');
    /*
        resolveTranslation takes one or two arguments.
        1. A translation label, e.g. 'global.default_title'
        2. (optional) The fallback text to use, if no translation is available for the given label
     */
    title.innerText = resolveTranslation(config.caption, 'Hello World!');
    wrapper.appendChild(title);

    const videoEl = document.createElement('div');
    videoEl.className = 'example-video';

    const imageEl = document.createElement('img');

    const exampleImageEndpoint = '/v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT';
    const exampleVideoEndpoint = '/v3/api/content/v1/videos/cdef73a0-5f75-4d4f-bb0e-aaca6275fd6e/en-INT';

    return Promise.all([
        /*
           resolveImageUrl takes one argument.
           1. An object with the following possibilities:
               imageEndpoint: A content repository endpoint pointing to an image asset (e.g. /v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT)
               options:
                   width: The desired width of the image (required).
                   and one of the following:
                   - aspectRatio: The aspect ratio as number, e.g. 1.78 for 16/9 (calculated as width / height)
                   - height: The desired height of the image

               NOTE: The width, height and aspectRatio parameters only work for images that do have an imageProvider other than 'absolute',
               as the transformation is done on the image server, not on the client.

               Examples:
               resolveImageUrl({imageEndpoint: "/v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT", options: { width: 500, aspectRatio: 1.78}});
               resolveImageUrl({imageEndpoint: "/v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT", options: { width: 500, height: 200}});
        */
        resolveImageUrl({imageEndpoint: exampleImageEndpoint, options: {width: 400, aspectRatio: 1}}).then((url) => {
            imageEl.setAttribute('src', url);
        }),
        /*
            renderInlineVideoPlayer takes 3 arguments.
            1. A content repository endpoint pointing to a video asset. The required `rb3Schema=v1:video` is added if not provided.
            2. A content repository endpoint loading a playlist. Not required for a single video.
            3. The DOM element the video player should be added to
         */
        renderInlineVideoPlayer(exampleVideoEndpoint, null, videoEl)
    ]).then(() => {
        wrapper.appendChild(imageEl);
        wrapper.appendChild(videoEl);
        el.appendChild(wrapper);
        console.log('started');

        return {
            stop: () => {
                console.log('stopped');
            }
        };
    });
}

function attach() {
    const customClass = document.getElementById('custom-id');
    const textBlockElement = document.createElement('div');
    textBlockElement.className = 'example-text-block';
    textBlockElement.innerText = 'This is a sample text';
    customClass.appendChild(textBlockElement);
}

export {start, attach};
