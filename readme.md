# node_file_renamer

## A CLI file renamer written in JavaScript

### Building

Once you've clone the repo on to your computer, all you need to build the application is to run:

* `npm ci`
* `npm run build`

The application will be exported into the `dist` folder as `file_renamer.js`.

### Running

The application can be run either by using NodeJS to run the application:
* `node file_renamer.js`

The application can also be run by using a dot slash execution:
* `./file_renamer.js`

When run, the application will use the current directory to find files to rename. You can use the `-d` argument to specific a location:
`./file_renamer.js -d /path/to/my/files

### Installation

The application gets built such that all parts of the app are included in the single `file_renamer.js` file. You can then place this file into your `/usr/local/bin` to make it available to everyone on your computer (on Linux & MacOS):

`cp dist/file_renamer.js /usr/local/bin/file_renamer`

Afterward, you can the application by running `file_renamer`.
