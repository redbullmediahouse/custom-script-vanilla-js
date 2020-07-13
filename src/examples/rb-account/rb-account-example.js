import '../../styles.css';
import '../../markdown.css';

import markdown from './README.md';

let RBAccountSDK;
let scriptEl;

const loggedOutMessage = `You are not logged in`;
const loggedInMessage = (user) => `Welcome ${user.userProfile.first_name}, you are logged in now!`;

function render() {
    const user = RBAccountSDK && RBAccountSDK.getUser();
    const message = user ? loggedInMessage(user) : loggedOutMessage;

    scriptEl.innerHTML = `
        <div class="rb-example__example rb-example__rb-account">
            <div class="rb-example__documentation markdown-body">
                ${markdown}
            </div>
            <div class="rb-example__account">
                <button class="rb-example__login-button ${user ? 'rb-example__login-button--hidden' : ''}">Login to the World of Red Bull</button>
                <button class="rb-example__logout-button ${!user ? 'rb-example__logout-button--hidden' : ''}">Logout</button>
                <div class="rb-example__login-message">
                    ${message}
                </div>
            </div>
        </div>
    `
    if (RBAccountSDK) {
        scriptEl.querySelector('.rb-example__login-button').addEventListener('click', () => {
            RBAccountSDK.login().catch(e => {
                console.log('user canceled login process or an error occured', e);
            })
        });

        scriptEl.querySelector('.rb-example__logout-button').addEventListener('click', () => {
            RBAccountSDK.logout().catch(e => {
                console.log('user canceled login process or an error occured', e);
            })
        });
    }
}

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;
    scriptEl = el;

    const {getRBAccount} = options;

    return getRBAccount().then(({RBAccounts, user}) => {
        RBAccountSDK = RBAccounts;

        // Update the Token for your activation
        // RBAccounts.setToken({application: '123456789'})

        RBAccountSDK.onEvent('signedIn', onAccountUpdate);
        RBAccountSDK.onEvent('sessionChecked', onAccountUpdate);
        RBAccountSDK.onEvent('loggedOut', onAccountUpdate);

        render();

        return Promise.resolve({stop: () => {
            console.log('stop');
        }});
    });
}

function onAccountUpdate(user) {
    render();
}

export {start};
