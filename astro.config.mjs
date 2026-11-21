// oss.pulzr.net: the organization's Pages site. Its custom domain is also the
// domain every pulzar-net project site is served under, at
// https://oss.pulzr.net/<repository>/. The project list comes from
// @pulzr/docs-theme's projects.mjs, the one place it is kept.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins, site } from '@pulzr/docs-theme';

export default defineConfig({
	site,
	build: { format: 'file' },
	integrations: [
		starlight({
			title: 'oss.pulzr.net',
			description: 'The gateway OS, radio stacks, device libraries and tools under Pulzr, in the open.',
			plugins: pulzarPlugins({ project: 'pulzar-net.github.io', siteDir: '.' }),
			sidebar: [],
		}),
	],
});
