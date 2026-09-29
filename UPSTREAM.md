# Upstream origin and triage

- Original package: `import-meta-resolve@4.2.0`
- Repository: https://github.com/wooorm/import-meta-resolve
- Source commit: https://github.com/wooorm/import-meta-resolve/commit/88a0e387cb4617c0f03217026adef2208018d41a
- Source directory: `.`
- npm tarball: https://registry.npmjs.org/import-meta-resolve/-/import-meta-resolve-4.2.0.tgz
- SHA512 integrity: `sha512-Iqv2fzaTQN28s/FwZAoFq0ZSs/7hMAHJVX+w8PZl3cY19Pxk6jFFalxQoIfW2826i/fDLXv8IiEZRIT0lDuWcg==`
- npm last-release age selects maintenance scope; it does not imply no ongoing source development.

## Reviewed issues

Primary-source snapshot: `2026-09-29T00:22:22.754964+00:00`. Most recently updated 100 open and 30 closed issue/PR entries; PRs removed. This is triage evidence, not a claim of exhaustive review.

Correct the duplicated object type in argument errors (issue 35) and parse data URL MIME headers in bounded linear work (issue 33).

- [35: types.slice(pos, 1) in errors.js should be splice — 'object' is never removed from the type list](https://github.com/wooorm/import-meta-resolve/issues/35)
- [34: Allow `#/` subpath imports — sync with Node v25.4.0 (nodejs/node#60864)](https://github.com/wooorm/import-meta-resolve/issues/34)

The structured snapshot in `.stackline/issue-triage.json` also records recently closed reports. Issues for unrelated packages in shared monorepositories were qualified as outside this fork’s runtime scope. No maintainer was contacted.

Single-wildcard diagnostic substitution is expressed explicitly, retaining the Node resolver behavior; it is not a sanitizer and does not replace multiple wildcards.
