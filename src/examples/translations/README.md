# Translations

RedBull.com uses WebTranslateIT for managing Translations. Every translation is a key/value pair.
These translations are injected into the page using a simple JavaScript Object containing the kev/value pairs.

To resolve a known translation key, custom scripts receive a `resolveTranslation` function, accepting 1 or 2 parameters.

## API
`resolveTranslation(key, fallback)`

1. The key is a translation identifier coming from WebTranslateIT
2. (optional) The fallback text to use, if no translation is available for the given key. Usually an english translation

## Usage
### Without fallback
`resolveTranslation("global.default_title")`

### With fallback
`resolveTranslation("not.existing.translation", "Fallback Text")`

## Example
