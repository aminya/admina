<!-- Generated via running `pnpm run docs` -->

<h1 align="center">admina</h1>
<p>
  <a href="https://github.com/aminya/admina/actions/workflows/CI.yml" target="_blank">
    <img alt="CI" src="https://github.com/aminya/admina/actions/workflows/CI.yml/badge.svg">
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Detect root/admin/sudo and execute commands as it if available

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [`hasSudo` (function)](#hassudo-function)
  - [`isRoot` (function)](#isroot-function)
  - [`isSudo` (function)](#issudo-function)
  - [`prependSudo` (function)](#prependsudo-function)
  - [`execRootSync` (function)](#execrootsync-function)
  - [`execRoot` (function)](#execroot-function)
  - [`isAdminWindows` (variable)](#isadminwindows-variable)
  - [`isAdminPosix` (variable)](#isadminposix-variable)
  - [`isAdmin` (function)](#isadmin-function)
- [🤝 Contributing](#contributing)

<!-- /code_chunk_output -->

## Install

```sh
npm install --save admina
```

`admina` is tiny and treeshakable.

## Usage

Automatic (depends on your build system)

```js
import * as admina from "admina"
```

Node

```js
import * as admina from "admina/dist/index.node.mjs"
```

Node CJS

```js
const admina = require("admina/dist/index.node.cjs")
```

## API

`admina` supports the following functions:

<!-- INSERT GENERATED DOCS START -->

### `hasSudo` (function)

Detect if sudo is available

**returns:** boolean

### `isRoot` (function)

Detect if the process has root privilege on Posix.

**returns:** boolean

```js
import { isRoot } from "admina"

console.log(isRoot())
//=> false
```

### `isSudo` (function)

Detect if sudo is available and the user has root privileges

**returns:** boolean

### `prependSudo` (function)

Prepend `sudo` to the command if sudo is available

**Parameters:**

- command (`string`)

**returns:** string

### `execRootSync` (function)

Execute a command as root if sudo is available. Otherwise executes the command normally without sudo.

**Parameters:**

- program (`string`) - The program to spawn
- args (`string[]`) - The command arguments
- execOptions (`execa.SyncOptions`) - The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`

**returns:** execa.ExecaSyncReturnValue<string>

### `execRoot` (function)

Asynchronously execute a command as root if sudo is available. Otherwise executes the command normally without sudo.

**Parameters:**

- program (`string`) - The program to spawn
- args (`string[]`) - The command arguments
- execOptions (`execa.Options`) - The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`

**returns:** execa.ExecaChildProcess<string>

### `isAdminWindows` (variable)

Check if the process is running as administrator on Windows.

```js
import { isAdminWindows } from "admina"

console.log(await isAdminWindows())
//=> false
```

### `isAdminPosix` (variable)

Detect if the process has root privilege on Posix.

```js
import { isAdminPosix } from "admina"

console.log(isAdminPosix())
//=> false
```

### `isAdmin` (function)

Detect if the code is running as admin/root

On Windows, it checks for admin access, and on Posix, it checks for root access

**returns:** boolean | Promise<boolean>

```js
import { isAdmin } from "admina"

console.log(isAdmin())
//=> false
```

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/admina/blob/master/CONTRIBUTING.md).
