# Development docs

## Dependecies

The project was built with `node v14+`. Older versions might work too, but haven't been tested.

To install this version of node I recommend using:  
[NVM](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows)
based on your operating sytem.

Downloading rest of the dependecies after is fairly trivial:

```ps
npm install
```

## Building the app locally

You can easily build the project on your own machine, just run the follwing command:

```ps
npm build
```

This will create the `dist_electron` folder in the project's root directory with the binaires for your
platform.

## Creating new release

See: <https://github.com/samuelmeuli/action-electron-builder#releasin>
