# Stackline changelog

## 1.0.4 - 2026-11-04

- Publish the Stackline README with the correct package version.
- Preserve the original upstream README separately; runtime files remain unchanged.
- Verify the README inside the exact npm artifact before publication.

## 1.0.3

- Refresh the development toolchain and locked dependencies to address known security advisories.
- Run CI and publication with patched Node.js and verify the exact packed manifest.

## 1.0.0

- Adopt maintenance from `import-meta-resolve@4.2.0` with preserved source history and license.
- Correct the duplicated object type in argument errors (issue 35) and parse data URL MIME headers in bounded linear work (issue 33).
- Add tested, reproducible artifact publication with npm provenance and immutable release evidence.

Single-wildcard diagnostic substitution is expressed explicitly, retaining the Node resolver behavior; it is not a sanitizer and does not replace multiple wildcards.
