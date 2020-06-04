# Inline Videos
If you want to render the Red Bull Video Player into an element of your custom script, you can use
the `renderInlineVideoPlayer`, which is passed into the custom script.

## API
`renderInlineVideoPlayer(videoEndpoint, playlistEndpoint, domElement)`

### Input:
1. `videoEndpoint`: The Content Repository endpoint to load the video
2. `playlistEndpoint` Deprecated, pass null for this value.
3. `domElement`: The DOM Element to render the player into

### Returns:
A Promise indicating if the player was rendered successfully.

## Usage
`renderInlineVideoPlayer("/v3/api/composition/v3/query/en-INT?filter[type]=videos&page[limit]=1", null, exampleEl)`

## Example
