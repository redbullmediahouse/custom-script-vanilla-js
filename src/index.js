import './styles.css';

const transformedImageData = {
    data: {
        id: "rrn:content:images:8bcd3825-cb43-4a91-8e56-c1cddd55ff33:en-INT",
        type: "image",
        title: "Air Race Zivko Edge",
        uriSlug: "8bcd3825-cb43-4a91-8e56-c1cddd55ff33",
        copyright: "© Red Bull Content Pool",
        altText: "Air Race Zivko Edge",
        imageEssence: {
            provider: "imageserver",
            raw: {
                width: 5184,
                height: 3456
            },
            extension: ".jpg",
            mimeType: "image/jpeg",
            templateURL: "rbcom/010/2014-09-12/1331678164612_4/{op}/1/zivko-edge-red-bull.jpg"
        },
        subType: "image"
    }
};

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
        1. An image asset from the content repository transformed using rb3Schema=v1:image
        2. An options object with the following possibilities:
            width: The desired width of the image (required).
            and one of the following:
            - aspectRatio: The aspect ratio as number, e.g. 1.78 for 16/9 (calculated as width / height)
            - height: The desired height of the image

            NOTE: The width, height and aspectRatio parameters only work for images that do have an imageProvider other than 'absolute',
            as the transformation is done on the image server, not on the client.

            Examples:
            resolveImageUrl(redBullLogo, {width: 500, aspectRatio: 1.78});
            resolveImageUrl(redBullLogo, {width: 500, height: 200});
     */
    const imageSrc = resolveImageUrl(transformedImageData.data, {width: 400, aspectRatio: 1});
    image.setAttribute('src', imageSrc);
    wrapper.appendChild(image);
    el.appendChild(wrapper);

    console.log('started');
    return Promise.resolve({
        stop: () => {
            console.log('stopped');
            return Promise.resolve();
        }
    });
}

export {start};
