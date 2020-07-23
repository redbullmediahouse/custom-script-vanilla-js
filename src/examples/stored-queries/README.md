# Stored Queries
The size of individual GraphQL query strings can be a major pain point. The GraphQL API implements Stored Queries, a technique that greatly improves network performance for GraphQL.
A stored query has an ID that can be sent to the server instead of the entire GraphQL query string. This smaller signature reduces bandwidth utilization and speeds up client loading times.

See the documentation at https://api.developers.redbull.com/docs/stored-queries for more information.

This example is not supposed to be used in custom scripts directly, but in build pipelines or to manually create/update stored queries.

## Creating a stored query
The documentation contains instructions on how to create a stored query using the Content Repository Explorer.
In addition to that, there is the possibility to create queries using our Rest API.
Check the source code to see how to save a stored query. This can be integrated into your CI Pipeline to created stored queries whenever the source query changed.

Please Note: You need to provide your own API Key to be able to run the example. Get in touch with us if you don't have one yet.
Also add this key to your `.graphqlconfig` file to enable IDE and tooling support.

## Running the example script
Either run `save-stored-query.js` from your IDE directly or run using npm:
```
npm run save-stored-query
```
