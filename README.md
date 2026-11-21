# oss.pulzr.net

[![pages](https://github.com/pulzar-net/pulzar-net.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/pulzar-net/pulzar-net.github.io/actions/workflows/pages.yml)

The landing page for Pulzar's open-source projects, at
**[oss.pulzr.net](https://oss.pulzr.net/)**.

This is the `pulzar-net` organization's GitHub Pages site. Its custom domain,
`oss.pulzr.net`, is also the domain every project site in the organization is
served under: a repository's Pages site is at `https://oss.pulzr.net/<repository>/`
(for example [oss.pulzr.net/zigbee-bridge](https://oss.pulzr.net/zigbee-bridge/)),
and the old `pulzar-net.github.io/<repository>/` addresses redirect there.

## The project list

The page lists every public project from
[`projects.mjs`](https://github.com/pulzar-net/docs-theme/blob/main/projects.mjs)
in [`@pulzr/docs-theme`](https://github.com/pulzar-net/docs-theme), the same
list each docs site's project switcher shows. To add a project, add it there
and release the theme; Dependabot brings the release here.

## Building

```sh
npm ci
npm run dev     # http://localhost:4321
npm run build   # dist/, fails on a broken internal link
```

`.github/workflows/pages.yml` builds and publishes it on every push to `main`.

## License

[MIT](LICENSE).
