import './styles.css';



function start(params) {
    const {el, config, options} = params;
    const {resolveTranslation, resolveImageUrl} = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-class';

    const title = document.createElement('h1');
    /*
        resolveTranslation takes one or two arguments.
        1. A translation label, e.g. 'global.default_title'
        2. (optional) The fallback text to use, if no translation is available for the given label
     */
    title.innerText = resolveTranslation(config.caption, 'Hello World!');
    wrapper.appendChild(title);

    const image = document.createElement('img');
    /*
        resolveImageUrl takes two arguments.
        1. A content repository endpoint pointing to an image asset. The required `rb3Schema=v1:image` is added if not provided.
        2. An options object with the following possibilities:
            width: The desired width of the image (required).
            and one of the following:
            - aspectRatio: The aspect ratio as number, e.g. 1.78 for 16/9 (calculated as width / height)
            - height: The desired height of the image

            NOTE: The width, height and aspectRatio parameters only work for images that do have an imageProvider other than 'absolute',
            as the transformation is done on the image server, not on the client.

            Examples:
            resolveImageUrl(imageEndpoint, {width: 500, aspectRatio: 1.78});
            resolveImageUrl(imageEndpoint, {width: 500, height: 200});
     */
    const exampleImageEndpoint = '/v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT';
    return resolveImageUrl(exampleImageEndpoint, {width: 400, aspectRatio: 1}).then(imageSrc => {
        image.setAttribute('src', imageSrc);
        wrapper.appendChild(image);
        el.appendChild(wrapper);
        console.log('started');
    }).then(() => ({
        stop: () => {
            console.log('stopped');
            return Promise.resolve();
        }
    }));
}

export {start};
