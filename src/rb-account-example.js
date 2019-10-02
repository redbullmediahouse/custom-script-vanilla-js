let RBAccountSDK;
let messageEl;

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
    messageEl.innerText = message;
}

function onAccountUpdate(user) {
    const loginButton = document.querySelector('.rb-example__login-button');
    if (user) {
        const {userProfile, userTokens} = user;
        console.log('user logged in', userProfile.first_name, userProfile.last_name);
        console.log(userTokens);
        loginButton && loginButton.classList.add('rb-example__login-button--hidden');
    } else {
        loginButton && loginButton.classList.remove('rb-example__login-button--hidden');
    }
    updateLoggedInMessage(user);
}

export {start, attach};