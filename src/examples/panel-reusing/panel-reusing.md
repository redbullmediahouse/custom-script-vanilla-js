# Panel Reusing
Whenever a page change between two .COM pages occurs, the .COM application tries to reuse as much of the existing DOM as possible.
In order to tell the application if and how a custom script can be reused, it needs to implement the following functions:

To do so, there are two functions which need to be implemented:
* shouldReusePanelWithConfig
* reusePanelWithConfig

## API
`shouldReusePanelWithConfig(newConfig)`
Returns a boolean value indicating if the script can be re-used with the config passed into the function.
If set to false, the script will be removed and started again after page refresh.

`reusePanelWithConfig(newConfig)`
Does not have a return value.
Should trigger any action needed to update the DOM of the custom script.
In React, this could mean to call a render on the Element.

# Server Side Rendering / Hydration
If your custom script is within the first 4 visible panels on a page, your script will potentially be server side rendered.
By default, custom scripts will be freshly rendered and started when mounted, regardless of server side rendering.

However, libraries like React or Preact are using a diff algorithm to reduce the amount of DOM updates.
In these cases it could make sense to re-use the server side rendered DOM and let the diffing handle the rest.

To take advantage of this, you can export the `canHandlePrerenderedDom` flag with a `true` value.
Check the code to see how it works.
