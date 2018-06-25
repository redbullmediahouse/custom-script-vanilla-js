import './styles.css';

function start(options) {
    const {el} = options;
    const title = document.createElement('h1');
    title.innerText = 'Hello World!';
    title.className = 'custom-class';
    el.appendChild(title);

    console.log('started');
    return Promise.resolve({
        stop: () => {
            console.log('stopped');
            return Promise.resolve();
        }
    });
}

export {start};
