import './styles.css';

let RBAccount;
let customScriptEl;

const loggedOutMessage = `You are not logged in`;
const loggedInMessage = (user) => `Welcome ${user.userProfile.first_name}`;

function start(params) {
    const {el, config, options} = params;
    const {resolveTranslation, resolveImageUrl, renderInlineVideoPlayer, getRBAccount} = options;

    customScriptEl = el;

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

    const videoEl = document.createElement('div');
    videoEl.className = 'example-video';

    const imageEl = document.createElement('img');

    const exampleImageEndpoint = '/v3/api/content/v1/images/8bcd3825-cb43-4a91-8e56-c1cddd55ff33/en-INT';
    const exampleVideoEndpoint = '/v3/api/content/v1/videos/cdef73a0-5f75-4d4f-bb0e-aaca6275fd6e/en-INT';

    const loginButtonEl = document.createElement('button');
    loginButtonEl.innerText = 'Login to the World of Red Bull';
    loginButtonEl.classList.add('login-button')

    const messageEl = document.createElement('h3');
    messageEl.className = 'login-message';

    wrapper.appendChild(messageEl);
    wrapper.appendChild(loginButtonEl);
    wrapper.appendChild(imageEl);
    wrapper.appendChild(videoEl);

    return Promise.all([
        /*
            getRBAccount() returns a promise that resolves as soon as the Accounts SDK is loaded
            You can therefore defer loading or rendering of certain elements until then
        */
        getRBAccount(),
        /*
           resolveImage takes one argument.
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
        resolveImageUrl({imageEndpoint: exampleImageEndpoint, options: {width: 400, aspectRatio: 1}}).then((imageUrl) => {
            imageEl.setAttribute('src', imageUrl);
        }),
        /*
            renderInlineVideoPlayer takes 3 arguments.
            1. A content repository endpoint pointing to a video asset. The required `rb3Schema=v1:video` is added if not provided.
            2. A content repository endpoint loading a playlist. Not required for a single video.
            3. The DOM element the video player should be added to
         */
        renderInlineVideoPlayer(exampleVideoEndpoint, null, videoEl)
    ]).then(([Account]) => {
        RBAccount = Account.RBAccounts;
        const currentUser = Account.user;
        if (currentUser) {
            console.log(`Currently logged in user:`, currentUser.userProfile);
        }

        // Update the Token for your activation if required
        // RBAccount.setToken({application: '123456789'})
        
        customScriptEl.appendChild(wrapper);

        loginButtonEl.addEventListener('click', () => {
        RBAccount.login().then((user) => onUserSignedIn(user));

        /**
         * This Event will be called if the user logs in without a page redirect.
         * Currently this is not in use on our side, as we always use RBAccount.loginRedirect(), but this will change in the future
         */
        RBAccount.onEvent('signedIn', onUserSignedIn);
        /**
         * This Event is triggered whenever a user logs out
         */
        RBAccount.onEvent('loggedOut', onLogout);

        console.log('started');

        return {
            stop: () => {
                // don't forget to unsubscribe from all events
                RBAccount.removeEvent('signedIn', onUserSignedIn);
                RBAccount.removeEvent('loggedOut', onLogout);
            }
        };
    });
}

function attach() {
    const user = RBAccount.getUser();
    if (user) {
        document.querySelector('.login-button').classList.add('login-button--hidden');
    }

    const message = user ? loggedInMessage(user) : loggedOutMessage;
    updateMessage(message);
}

function onLogout() {
    updateMessage(loggedOutMessage);
    document.querySelector('.login-button').classList.remove('login-button--hidden');
}

function onUserSignedIn(user) {
    const {userProfile, userTokens} = user;
    console.log('user logged in', userProfile.first_name, userProfile.last_name);
    console.log(userTokens);
    document.querySelector('.login-button').classList.add('login-button--hidden');
    updateMessage(message);
}

function updateMessage(message) {
    const messageEl = customScriptEl.querySelector('.login-message');
    messageEl.innerText = message;
}

export {start, attach};
