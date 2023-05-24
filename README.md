

## Goal

Installing a typical toolchain for frontend development based on `node` and
`npm`, adjusting the layout of the directories and running the toolchain.

## About

A simple javascript file does not address advanced requirements. Instead
you will generate code from a source folder into a target folder by using
the toolchain. By convention the names are `src/` and `dist/`.

## Usage

While writing this tutorial I set up the project step by step to test
everything and to document it in a usable order. Alongside with with the
README I ship final runnable result of the files. I can't ship the intermediate
steps, though.

You have three options how to use this tutorial. It's your decision how deep
you want to dive. You can just read it as a kind of documentation. You can
fork and/or clone it to inspect and run the final result. You can follow along
and do everything from scratch to experience the full setup of a project.

If you decide to take the third approach start by copying the the file `card.js`
from the previous tutorial and adjust the names of the class and identifiers
to match this tutorial. Staying with the previous identifiers may work also
but could cause confusion and conflicts.

Even if you take the second approach you will need to set up the tools to run
them. In this case mind to run `npm install` after cloning to install the
libraries.

## Setup

### Installing node and npm inside the core developers container

`apt` is the package manager of Debian. It does install stable versions.
Somtimes they are rather outdated. The *node package manager* `npm` is the
package manager to run the project. It manages node modules and their large
dependency tree.

Open a shell and run the following commands.

```sh
    suod apt update
    sudo apt install npm
```

Check that node and npm have been installed by checing their versions.

```sh
    node -v
    npm -v
```


Unfortunately this versions on Debian are outdatet and will not work for recent
packages. We use `npm` to update `node.js` and `npm` themselves.

```sh
    sudo npm cache clean -f
    sudo npm install -g n
```

This globally installs the module `n`, which is a [version manager for
`node.js`](https://github.com/tj/n). Then install the curent stable version.

```sh
    sudo n stable
```

You may also want to try the latest verstion.

```sh
    sudo n latest
```

Take care the shell gets the new path as explained in the shell's output.

![updating nodejs](img/update-node.png)

Check that you got more recent versions.

```sh
    node -v
    npm -v
```

### Directories

Create the directoris `src/` and `dist/`. The latter would be created by the
toolchain. Just do it for sake of awareness. You can delete the directory
`dist/` any time to test the build process is fully working.

In some scenarios you may want to ignore the `dist/` directory in `.gitignore`
as it holds generated stuff. If you run a *HACS* repository you have to commit
it on the other hand. Mind that there is an additional `dist/` in the path now,
when you register the card as a resource.

### HACS

If you run a custom HACS repository, set `content_in_root` to `false`, to use
the default location `dist/` now.

```json
{
    "name": "Toggle card with toolchain",
    "render_readme": true,
    "filename": "card.js",
    "content_in_root": false
}
```

### Package management

We don't do the typical `npm init` call. It generates information, that is
targeted for libraries that are published to the *NPM Registry*. HACS retrieves
its information from the settings of the repository on Github. A minimal
`package.json` will be autocreated anyway as soon as we install packages.

Let's try by installing the bundler `parcel`.

```sh
    npm install --save-dev parcel
```

The option `--save-dev` tells that this is a management tool. It should not go
into `card.js` itself. A file `pagckage.json` has been created reflecting this.

```json
{
  "devDependencies": {
    "parcel": "^2.8.3"
  }
}
```

There is also a file `package-lock.json`. It describes all the dependencies that
have been downloaded for packages in `package.json` and all the versions that
have been resoved for them. It's important to commit this file to the git
repository.

The downloaded libraries have been installed into a folder named `node_modules`.
You may want to ignore this folder by an entry to `.gitignore` for not to push
all the heavy stuff to Github. If you cloned a repository from Github you run
`npm install`. This installs all libraries into `node_modules` again just as
defined in `package-lock.json`.

## Running the toolchain

### Parcel

Many developers are used to the bundler *Webpack*. Why
[*Parcel*](https://parceljs.org/) now? The answer is, to keep this tutorial
short and easy. We can run *Parcel* without setting up any configuration. It is
so much easier to get started.

You have placed your `card.js` file into the `src/` folder. Let's see how to
bring it to the `dist/` foder. If you want to follow along step by step, you can
copy a standalone `card.js` from a previous tutorial. If you forked this
tutorial `card.js` will draw in the other files already. That's just as fine.

```sh
npx parcel src/card.js
```

`npx` is a `npm` shortcut to run executables. It's equivalent to calling this
command:

```sh
./node_modules/parcel/lib/bin.js src/card.js
```

The file `dist/card.js` get's created. Not only that. The sources are watched.
Whenever one of the sourcefile is edited `dist/card.js` gets regenerated.
A hard realod of the browser is still required.

For sure you have to register the card before as a resource. Mind the new
subdirectory `dist/` is now part of the path.

![resource registration](img/resource.png)

Open `dist/card.js` in the editor to get an idea. You observe that the bundler
not only just did copy the file.

There is also a directory `.parcel-cache` to speed up the process. You should
exclude this from being added to git.

You can customize `package.json` with script entries to gain some comfort. You
call them as `npm run watch` and `npm rum build`.

```json
{
  "source": "src/card.js",
  "main": "dist/card.js",
  "scripts": {
    "watch": "parcel watch",
    "build": "parcel build"
  },
  [ ... ]
}
```

Visit the documentation of [*Parcel*](https://parceljs.org/docs/) to get more
ideas.

### Bundling

Now that the bundler is up and running, let's bundle!

`card.js` has grown large. We split it up into multiple parts.

```sh
src/index.js
src/card.js
src/card.html
src/card.css
src/editor.js
src/editor.html
src/editor.css
```

In `package.json` set the `source` to `src/index.js`. We use this file as
entrypoint to import the other files.

```js
import { ToggleCardWithToolchain } from "./card";
import { ToggleCardWithToolchainEditor } from "./editor";

customElements.define(
    "toggle-card-with-toolchain",
    ToggleCardWithToolchain
);
customElements.define(
    "toggle-card-with-toolchain-editor",
    ToggleCardWithToolchainEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "toggle-card-with-toolchain",
    name: "toggle card created with a toolchain",
    description: "Turn an entity on and off",
});
```

The classes get an `export` declaration. The file `card.js` only holds
the class of the card now. Handle `editor.js` accordingly.

```js
export class ToggleCardWithToolchain extends HTMLElement {
    [ ... ]
}
```