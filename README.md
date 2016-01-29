# Semaphore Status Chrome Extension

## Installation

1. `npm install`
2. `npm install gulp -g`
  - *if there is problem with missing gulpfile, uninstall `npm uninstall gulp -g` and install again. You have probably old non-babel compatible version*

## Usage

- All scripts and/or html pages from manifest.json are piped through preprocessor and prepared for using all features.
- When your extension does exactly what you want, you can run `gulp -p` for creating production `.crx` build.
- All your codebase belongs only to `src/` directory

## How to run development environment

You should do this if you want to test out the checked out version of the component.

1. run `gulp` which will start webpack-dev-server
2. in Chrome open `chrome://extensions/`
3. check `Developer mode`
4. click on `Load unpacked extension`
5. add REPOSITORY_DIRECTORY/build
6. Click the options link and put in
  - the project hash (found in project setting on semaphore in the Admin tab)
  - your api auth token (found in your semaphore account settings)
7. Find extension icon (blue webpack image) right from adress bar. click it to get project server statuses!
8. You can edit your codebase with almost 100% hot/full reload support.

## How to build extension for deploy

1. run `gulp -p`
2. It will compile scripts, styles and other assets into release/build/
3. It will make chrome extension into release/build.crx with certificate release/build.pem
