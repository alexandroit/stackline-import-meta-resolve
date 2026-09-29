# @stackline/import-meta-resolve

> Resolve things like Node.js — ponyfill for `import.meta.resolve`.

[![npm version](https://img.shields.io/npm/v/@stackline/import-meta-resolve.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/import-meta-resolve)
[![license](https://img.shields.io/npm/l/@stackline/import-meta-resolve.svg?style=flat-square)](https://github.com/alexandroit/stackline-import-meta-resolve)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-import-meta-resolve-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-import-meta-resolve)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/import-meta-resolve/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/import-meta-resolve/)** | **[npm](https://www.npmjs.com/package/@stackline/import-meta-resolve)** | **[Issues](https://github.com/alexandroit/stackline-import-meta-resolve/issues)** | **[Repository](https://github.com/alexandroit/stackline-import-meta-resolve)**

**Current package version:** `1.0.1`

---

## Why this package?

`@stackline/import-meta-resolve` is the Stackline-maintained distribution of `import-meta-resolve@4.2.0`. It is an independent continuation of [import-meta-resolve](https://github.com/wooorm/import-meta-resolve); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/import-meta-resolve@1.0.1` |
| API target | `import-meta-resolve@4.2.0` |
| Supported Node.js | `See supported framework requirements` |
| License | `MIT` |
| Module type | `module` |
| Main entry | `index.js` |
| Types | `index.d.ts` |
| Runtime dependencies | `none` |

## Installation

```bash
npm install @stackline/import-meta-resolve
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install import-meta-resolve@npm:@stackline/import-meta-resolve
```

## Usage and API reference

Resolve things like Node.js.

## Contents

* [What is this?](#what-is-this)
* [When to use this?](#when-to-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`resolve(specifier, parent)`](#resolvespecifier-parent)
  * [`moduleResolve(specifier, parent, conditions, preserveSymlinks)`](#moduleresolvespecifier-parent-conditions-preservesymlinks)
  * [`ErrnoException`](#errnoexception)
* [Algorithm](#algorithm)
* [Differences to Node](#differences-to-node)
* [Types](#types)
* [Compatibility](#compatibility)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a ponyfill for [`import.meta.resolve`][native-resolve].
It supports everything you need to resolve files just like modern Node does:
import maps, export maps, loading CJS and ESM projects, all of that!

## When to use this?

As of Node.js 20.0, `import.meta.resolve` is still behind an experimental flag.
This package can be used to do what it does in Node 16–20.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install @stackline/import-meta-resolve
```

## Use

```js
import {resolve} from '@stackline/import-meta-resolve'

// A file:
console.log(resolve('./index.js', import.meta.url))
//=> file:///Users/tilde/Projects/oss/import-meta-resolve/index.js

// A CJS package:
console.log(resolve('builtins', import.meta.url))
//=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/builtins/index.js

// A scoped CJS package:
console.log(resolve('@eslint/eslintrc', import.meta.url))
//=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/@eslint/eslintrc/lib/index.js

// A package with an export map:
console.log(resolve('micromark/lib/parse', import.meta.url))
//=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/micromark/lib/parse.js

// A node builtin:
console.log(resolve('fs', import.meta.url))
//=> node:fs
```

## API

This package exports the identifiers [`moduleResolve`][moduleresolve] and
[`resolve`][resolve].
There is no default export.

### `resolve(specifier, parent)`

Match `import.meta.resolve` except that `parent` is required (you can pass
`import.meta.url`).

###### Parameters

* `specifier` (`string`)
  — the module specifier to resolve relative to parent
  (`/example.js`, `./example.js`, `../example.js`, `some-package`, `fs`, etc)
* `parent` (`string`, example: `import.meta.url`)
  — the absolute parent module URL to resolve from; you must pass
  `import.meta.url` or something else

###### Returns

Full `file:`, `data:`, or `node:` URL (`string`) to the found thing

###### Throws

Throws an [`ErrnoException`][errnoexception].

### `moduleResolve(specifier, parent, conditions, preserveSymlinks)`

The [“Resolver Algorithm Specification”][algo] as detailed in the Node docs
(which is slightly lower-level than `resolve`).

###### Parameters

* `specifier` (`string`)
  — `/example.js`, `./example.js`, `../example.js`, `some-package`, `fs`, etc
* `parent` (`URL`, example: `import.meta.url`)
  — full URL (to a file) that `specifier` is resolved relative from
* `conditions` (`Set<string>`, default: `new Set(['node', 'import'])`)
  — conditions
* `preserveSymlinks` (`boolean`, default: `false`)
  — keep symlinks instead of resolving them

###### Returns

A URL object (`URL`) to the found thing.

###### Throws

Throws an [`ErrnoException`][errnoexception].

### `ErrnoException`

One of many different errors that occur when resolving (TypeScript type).

###### Type

```ts
type ErrnoExceptionFields = Error & {
  errnode?: number | undefined
  code?: string | undefined
  path?: string | undefined
  syscall?: string | undefined
  url?: string | undefined
}
```

The `code` field on errors is one of the following strings:

* `'ERR_INVALID_MODULE_SPECIFIER'`
  — when `specifier` is invalid (example: `'#'`)
* `'ERR_INVALID_PACKAGE_CONFIG'`
  — when a `package.json` is invalid (example: invalid JSON)
* `'ERR_INVALID_PACKAGE_TARGET'`
  — when a `package.json` `exports` or `imports` is invalid (example: when it
  does not start with `'./'`)
* `'ERR_MODULE_NOT_FOUND'`
  — when `specifier` cannot be found in `parent` (example: `'some-missing-package'`)
* `'ERR_NETWORK_IMPORT_DISALLOWED'`
  — thrown when trying to resolve a local file or builtin from a remote file
  (`node:fs` relative to `'https://example.com'`)
* `'ERR_PACKAGE_IMPORT_NOT_DEFINED'`
  — when a local import is not defined in an import map (example: `'#local'`
  when not defined)
* `'ERR_PACKAGE_PATH_NOT_EXPORTED'`
  — when an export is not defined in an export map (example: `'tape/index.js'`,
  which is not in its export map)
* `'ERR_UNSUPPORTED_DIR_IMPORT'`
  — when attempting to import a directory (example: `'./lib/'`)
* `'ERR_UNKNOWN_FILE_EXTENSION'`
  — when somehow reading a file that has an unexpected extensions (`'./readme.md'`)
* `'ERR_INVALID_ARG_VALUE'`
  — when `conditions` is incorrect

## Algorithm

The algorithm for `resolve` matches how Node handles `import.meta.resolve`, with
a couple of differences.

The algorithm for `moduleResolve` matches the [Resolver Algorithm
Specification][algo] as detailed in the Node docs (which is sync and slightly
lower-level than `resolve`).

## Differences to Node

* `parent` defaulting to `import.meta.url` cannot be ponyfilled: you have to
  explicitly pass it
* no support for loaders (that would mean implementing all of loaders)
* no support for CLI flags:
  `--conditions`,
  `--experimental-default-type`,
  `--experimental-json-modules`,
  `--experimental-network-imports`,
  `--experimental-policy`,
  `--experimental-wasm-modules`,
  `--input-type`,
  `--no-addons`,
  `--preserve-symlinks`, nor
  `--preserve-symlinks-main`
  work
* no support for `WATCH_REPORT_DEPENDENCIES` env variable
* no attempt is made to add a suggestion based on how things used to work in
  CJS before to not-found errors
* prototypal methods are not guarded: Node protects for example `String#slice`
  or so from being tampered with, whereas this doesn’t

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`ErrnoException`][errnoexception].

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 16 and later.

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Titus Wormer][author] and Node.js contributors



[algo]: https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_resolver_algorithm

[author]: https://wooorm.com

[build]: https://github.com/wooorm/import-meta-resolve/actions

[build-badge]: https://github.com/wooorm/import-meta-resolve/workflows/main/badge.svg

[contribute]: https://opensource.guide/how-to-contribute/

[coverage]: https://codecov.io/github/wooorm/import-meta-resolve

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/import-meta-resolve.svg

[downloads]: https://www.npmjs.com/package/import-meta-resolve

[downloads-badge]: https://img.shields.io/npm/dm/import-meta-resolve.svg

[errnoexception]: #errnoexception

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[license]: license

[moduleresolve]: #moduleResolvespecifier-parent-conditions-preserveSymlinks

[native-resolve]: https://nodejs.org/api/esm.html#esm_import_meta_resolve_specifier_parent

[npm]: https://docs.npmjs.com/cli/install

[resolve]: #resolvespecifier-parent

[typescript]: https://www.typescriptlang.org

## Credits and original authors

- Original project: [import-meta-resolve](https://github.com/wooorm/import-meta-resolve).
- Titus Wormer.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
