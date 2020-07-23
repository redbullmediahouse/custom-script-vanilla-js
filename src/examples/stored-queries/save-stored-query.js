const fs = require('fs');
const path = require('path');
const axios = require('axios');

const endpoint = 'https://graphql.crepo-staging.redbullaws.com/v1/queries';
// Add your Content Repository API Key here
// Get in contact with
const apiKey = '';
if (apiKey === '') {
    throw new Error('Please provide your API Key')
}

function loadStoredQueryFile() {
    const fileContents = fs.readFileSync(path.join(__dirname, 'ExampleQuery.graphql'));
    return fileContents.toString();
}

async function saveStoredQuery(query) {

    try {
        const response = await axios.post(endpoint, {query}, {
            headers: {'API-Key': apiKey, 'Content-Type': 'application/json'}
        });
        return response.headers.location;
    } catch (e) {
        console.error(e)
        return null;
    }
}

function updateStoredQuery() {
    const query = loadStoredQueryFile();
    return saveStoredQuery(query);
}

updateStoredQuery().then(location => {
    console.log('Sucessfully stored query', location);
})

