# Resolve Image URLs
The recommended way to load image sources is by using our GraphQL API.
We have prepared a "Stored Query" which returns the Image URL of an image asset, based on some input values,
such as width and height.

See the code on how to use the stored query and get the image source from the response.

[GraphQL Documentation for Image Sources](https://api.developers.redbull.com/docs/schema-extensions#image-source)

## Query and Query Variables
Behind the scenes we are executing the following query:

```
query ImageData($id: String!, $width: Int, $height: Int, $mode: ImageModes) {
  resource(id: $id) {
    ... on Image {
      imageSrc(width: $width, height: $height, mode: $mode)
    }
  }
}
```

The query supports the following query variables:
```
{
  "width": 500,
  "height": 250,
  "mode": "scale",
  "id": "rrn:content:images:062e3777-9365-40ec-a328-1279f69307e2:en-INT"
}
```

## Example
