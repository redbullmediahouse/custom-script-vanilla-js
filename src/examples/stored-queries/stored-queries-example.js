import styles from '../../styles.css';
import markdownStyles from '../../markdown.css';
import markdown from './README.md';

function start(params) {
    const {el} = params;

    el.innerHTML = `
        <style type="text/css">
            ${styles}
        </style>
        <style type="text/css">
            ${markdownStyles}
        </style>
        <div class="rb-example__example rb-example__resolve-translation">
            <div class="rb-example__documentation markdown-body">
                ${markdown}
            </div>
        </div>
    `

    return Promise.resolve({stop: () => {
        console.log('stop');
    }});
}

export {start};
