# Resolve Image URLs

## API
resolveImage accepts one argument.
  1. An object with the following possibilities:
    imageEndpoint: A content repository endpoint pointing to an image asset (e.g. /v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1)
    options:
      width: The desired width of the image (required).
      and one of the following:
        - aspectRatio: The aspect ratio as number, e.g. 1.78 for 16/9 (calculated as width / height)
        - height: The desired height of the image

    NOTE: The width, height and aspectRatio parameters only work for images that do have an imageProvider other than 'absolute', as the transformation is done on the image server, not on the client.

## Usage Examples:
* `resolveImageUrl({imageEndpoint: "/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1", options: { width: 500, aspectRatio: 1.78}});`
* `resolveImageUrl({imageEndpoint: "/v3/api/composition/v3/query/en-INT?filter[type]=images&page[limit]=1", options: { width: 500, height: 200}});`

## Example
