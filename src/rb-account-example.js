let RBAccountSDK;
let messageEl;
let favouritesEl;

function start(el, options) {
    const {getRBAccount} = options;
    const exampleEl = document.createElement('div');
    exampleEl.classList.add('rb-example__example', 'rb-example__rb-account');

    const headlineEl = document.createElement('h2');
    headlineEl.classList.add('rb-example__subheading');
    headlineEl.innerText = 'Red Bull Accounts Integration';
    exampleEl.appendChild(headlineEl);

    const documentationEl = document.createElement('pre');
    documentationEl.classList.add('rb-example__documentation');
    exampleEl.appendChild(documentationEl);

    const accountExampleEl = document.createElement('div');
    accountExampleEl.classList.add('rb-example__account');
    exampleEl.appendChild(accountExampleEl);

    const loginButtonEl = document.createElement('button');
    loginButtonEl.innerText = 'Login to the World of Red Bull';
    loginButtonEl.classList.add('rb-example__login-button');

    accountExampleEl.appendChild(loginButtonEl);

    messageEl = document.createElement('h3');
    messageEl.className = 'rb-example__login-message';
    accountExampleEl.appendChild(messageEl);

    const favouritesCaptionEl = document.createElement('h3');
    favouritesCaptionEl.classList.add('rb-example__small-subheading');
    favouritesCaptionEl.innerHTML = 'Your Favorites are: (Click to remove)';
    accountExampleEl.appendChild(favouritesCaptionEl);

    favouritesEl = document.createElement('ul');
    accountExampleEl.appendChild(favouritesEl);

    const addFavouriteCaption = document.createElement('h3');
    addFavouriteCaption.innerHTML = 'Add new favourite';

    const favouriteIdInput = document.createElement('input');
    favouriteIdInput.type = 'text';
    favouriteIdInput.value = 'rrn:content:stories:e6c07f13-2f8d-4092-a270-3d8bf4b957b4:en-INT';

    const addFavouriteButton = document.createElement('button');
    addFavouriteButton.innerHTML = 'Add';
    addFavouriteButton.addEventListener('click', () => {
        const id = favouriteIdInput.value;
        if (id && id.indexOf('rrn:content') !== -1) {
            addFavourite(id)
        }
    });

    accountExampleEl.appendChild(addFavouriteCaption);
    accountExampleEl.appendChild(favouriteIdInput);
    accountExampleEl.appendChild(addFavouriteButton);

    el.appendChild(exampleEl);

    return getRBAccount().then(({RBAccounts, user}) => {
        RBAccountSDK = RBAccounts;

        RBAccountSDK.onEvent('signedIn', onAccountUpdate);
        RBAccountSDK.onEvent('sessionChecked', onAccountUpdate);
        RBAccountSDK.onEvent('loggedOut', onAccountUpdate);

        loginButtonEl.addEventListener('click', () => {
            RBAccountSDK.login().catch(e => {
                console.log('user canceled login process or an error occured', e);
            })
        });

        updateLoggedInMessage(user);
    });
}

function attach() {
    const user = RBAccountSDK.getUser();
    if (user) {
        document.querySelector('.rb-example__login-button').classList.add('rb-example__login-button--hidden');
    }
    updateLoggedInMessage(user);
}

const loggedOutMessage = `You are not logged in`;
const loggedInMessage = (user) => `Welcome ${user.userProfile.first_name}, you are logged in now!`;

function updateLoggedInMessage(user) {
    const message = user ? loggedInMessage(user) : loggedOutMessage;
    updateMessage(message);
}

function updateMessage(message) {
    messageEl.innerText = message;
}

function loadFavourites() {
    return new Promise((resolve, reject) => {
        RBAccountSDK.getUserFavorites()
            .then(favourites => {
                resolve(favourites);
            })
            .catch(e => {
                console.log(e);
                resolve({});
            })
    });
}

function updateFavourites() {
    loadFavourites().then(favourites => {
        favouritesEl.innerHTML = '';
        Object.keys(favourites).forEach(id => {
            const fullId = id + ':en-INT';
            const listEntry = document.createElement('li');
            listEntry.innerHTML = fullId;
            listEntry.style.cursor = 'pointer';
            listEntry.addEventListener('click', () => {
                removeFavourite(fullId);
            });
            favouritesEl.appendChild(listEntry);
        });
    });
}

function addFavourite(id) {
    if (id.indexOf('en-INT') === -1) {
        alert('only en-INT assets are supported at the moment');
    } else {
        RBAccountSDK.addUserFavorite(id)
            .then(() => updateFavourites())
            .catch(e => {
                console.error('Error adding favourite', e);
            });
    }
}

function removeFavourite(id) {
    RBAccountSDK.deleteUserFavorite(id)
        .then(() => updateFavourites())
        .catch(e => {
            console.error('Error removing favourite', e);
        });
}

function userLoggedIn(user) {
    const {userProfile, userTokens} = user;
    const loginButton = document.querySelector('.rb-example__login-button');
    console.log('user logged in', userProfile.first_name, userProfile.last_name);
    console.log(userTokens);
    loginButton && loginButton.classList.add('rb-example__login-button--hidden');

    updateMessage(loggedInMessage(user));
    updateFavourites();
}

function userLoggedOut() {
    const loginButton = document.querySelector('.rb-example__login-button');
    loginButton && loginButton.classList.remove('rb-example__login-button--hidden');
    updateMessage(loggedOutMessage);
}

function onAccountUpdate(user) {
    if (user) {
        userLoggedIn(user)
    } else {
        userLoggedOut()
    }
}

export {start, attach};
