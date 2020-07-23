import '../../styles.css';
import '../../markdown.css';
import markdown from './README.md';

function start(params) {
    const {el} = params;

    el.innerHTML = `
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
