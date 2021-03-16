import styles from './styles.css';

function start(params) {
    /*
        el:         contains the element the custom script can use to attach itself to
        config:     contains everything from the scriptConfig in the XC
        options:    contains some utility functions for custom scripts (see examples for more information)
     */
    const {el, config, options} = params;

    el.innerHTML = `
        <style type="text/css">
            ${styles}    
        </style>
        <div class="custom-script-example">
            <h1 class="rb-example__headline">VanillaJS Custom Script Examples</h1>
            <div>
                <ul class="example-list">
                    <li class="example-list__example">
                        <a class="example-list__example-link" href="/pl-ay/local/8080/rbAccount.js">Red Bull Account Integration</a>
                    </li>
                    <li class="example-list__example">
                        <a class="example-list__example-link"  href="/pl-ay/local/8080/inlineVideo.js">Render an Inline Video Player</a>
                    </li>
                    <li class="example-list__example">
                        <a class="example-list__example-link"  href="/pl-ay/local/8080/resolveImageUrl.js">Resolve an Image URL</a>
                    </li>
                    <li class="example-list__example">
                        <a class="example-list__example-link"  href="/pl-ay/local/8080/resolveTranslation.js">Resolve Translations</a>
                    </li>
                    <li class="example-list__example">
                        <a class="example-list__example-link"  href="/pl-ay/local/8080/panelReusing.js">Panel Reusing and Server Side Rendering</a>
                    </li>
                    <li class="example-list__example">
                        <a class="example-list__example-link"  href="/pl-ay/local/8080/storedQueries.js">Stored Queries</a>
                    </li>
                </ul>
            </div>            
        </div>
    `

    return Promise.resolve({stop: () => {
        console.log('stop');
    }});
}

function attach() {
    // Attach is called after the custom script was mounted to the DOM
}

export {start, attach};
