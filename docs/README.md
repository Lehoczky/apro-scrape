# Development docs

## Dependencies

The project was built with `node v20+`. Older versions might work too, but haven't been tested.

To install this version of node I recommend using:  
[NVM](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows)
based on your operating sytem.

Downloading rest of the dependencies after is fairly trivial:

```ps
npm install
```

## Building the app locally

You can easily build the project on your own machine, just run the following command:

```ps
npm build
```

This will create the `dist_electron` folder in the project's root directory with the binaries for your
platform.

## Creating new release

```ps
npx lerna version
git push --follow-tags
```
