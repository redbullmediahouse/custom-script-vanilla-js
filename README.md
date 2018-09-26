# Developing and testing a Custom Script without dependencies

1. Install the development dependencies with `yarn` or `npm`
1. Run the development environment with `yarn serve` or `npm run serve`
1. Go to https://localhost:8080 and accept the exception of the self signed SSL certificate (Or if you are using chrome activate chrome://flags/#allow-insecure-localhost)
1. Try your script on https://delivery.rb3ca-staging.redbullaws.com/pl-ay/local/8080/bundle.js
1. Once you're done, compile your bundle for production with `yarn build` or `npm run build`
1. Your production-ready script is now saved in `dist/bundle.js`
